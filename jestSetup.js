import { mockdata } from './__mocks__/mockdata';

export const rnInvariant = jest.mock('invariant');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

export const rnFbAuth = jest.mock('@react-native-firebase/database', () =>
  jest.fn(() => ({
    ref: jest.fn(() => ({
      once: jest.fn(() => Promise.resolve({ val: () => mockdata })),
      on: jest.fn((a, cb) => cb({ val: () => mockdata })),
    })),
  })),
);
