/**
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { cleanup } from '@testing-library/react-native';
import { Navigator } from '../App';
import { AppProvider } from '../src/context/app.context';
import { mockdata } from '../__mocks__/mockdata';

describe('Testing himama', () => {
  afterEach(cleanup);
  test('launches with the login screen', async () => {
    const component = (
      <AppProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AppProvider>
    );

    const { queryAllByText, getByPlaceholderText } = render(component);
    const button = queryAllByText('Sign in');
    const passwordInput = getByPlaceholderText('Password');

    expect(button.length).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  test('navigates to home room when login is successful', async () => {
    const component = (
      <AppProvider>
        <NavigationContainer>
          <MenuProvider>
            <Navigator />
          </MenuProvider>
        </NavigationContainer>
      </AppProvider>
    );
    const homeRoom = mockdata.center.classrooms.filter(
      classroom => classroom.isHomeRoom,
    )[0];

    const CHANGE_TEXT = 'content';
    const {
      getByPlaceholderText,
      findByTestId,
      queryAllByText,
      findAllByTestId,
    } = render(component);

    expect(queryAllByText(homeRoom.name).length).toBeFalsy();

    await act(async () => {
      await fireEvent.changeText(getByPlaceholderText('Password'), CHANGE_TEXT);
      await fireEvent.changeText(getByPlaceholderText('Username'), CHANGE_TEXT);
      const button = await findByTestId('::signIn-btn');
      fireEvent.press(button);
      const students = await findAllByTestId('::student');
      expect(students.length).toBe(homeRoom.children.length);
    });

    expect(queryAllByText(homeRoom.name).length).toBeTruthy();
  });

  test('navigates to all classes from home room if allClassroomsAccessible is true', async () => {
    const component = (
      <AppProvider>
        <NavigationContainer>
          <MenuProvider>
            <Navigator />
          </MenuProvider>
        </NavigationContainer>
      </AppProvider>
    );
    const homeRoom = mockdata.center.classrooms.filter(
      classroom => classroom.isHomeRoom,
    )[0];

    const CHANGE_TEXT = 'content';
    const {
      getByPlaceholderText,
      findByTestId,
      queryAllByText,
      findAllByTestId,
    } = render(component);

    expect(queryAllByText(homeRoom.name).length).toBeFalsy();

    await act(async () => {
      await fireEvent.changeText(getByPlaceholderText('Password'), CHANGE_TEXT);
      await fireEvent.changeText(getByPlaceholderText('Username'), CHANGE_TEXT);
      const button = await findByTestId('::signIn-btn');
      fireEvent.press(button);
      const students = await findAllByTestId('::student');
      expect(students.length).toBe(homeRoom.children.length);
      expect(queryAllByText(homeRoom.name).length).toBeTruthy();

      const allClassesBtn = await findByTestId('::allClassesBtn');
      fireEvent.press(allClassesBtn);
    });
    const classes = await findAllByTestId('::class');
    expect(mockdata.center.classrooms.length).toBe(classes.length);
  });
});
