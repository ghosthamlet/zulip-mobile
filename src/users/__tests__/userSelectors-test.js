import deepFreeze from 'deep-freeze';

import {
  getAccountDetailsUser,
  getActiveUsers,
  getUsersStatusActive,
  getUsersStatusIdle,
  getUsersStatusOffline,
  getUsersByEmail,
  getUsersById,
  getUsersSansMe,
} from '../userSelectors';

describe('getAccountDetailsUser', () => {
  test('return user for the account details screen', () => {
    const state = deepFreeze({
      nav: {
        index: 1,
        routes: [{ routeName: 'first' }, { routeName: 'second', params: { email: 'b@a.com' } }],
      },
      users: [{ firstName: 'a', email: 'a@a.com' }, { firstName: 'b', email: 'b@a.com' }],
    });
    const expectedUser = { firstName: 'b', email: 'b@a.com' };

    const actualUser = getAccountDetailsUser(state);

    expect(actualUser).toEqual(expectedUser);
  });

  test('if user does not exist return a user with the same email and no details', () => {
    const state = deepFreeze({
      nav: {
        index: 1,
        routes: [
          { routeName: 'first', params: { email: 'a@a.com' } },
          { routeName: 'second', params: { email: 'b@a.com' } },
        ],
      },
      users: [],
    });
    const expectedUser = {
      email: 'b@a.com',
      fullName: 'b@a.com',
      avatarUrl: '',
      id: -1,
      isActive: false,
      isAdmin: false,
      isBot: false,
    };

    const actualUser = getAccountDetailsUser(state);

    expect(actualUser).toEqual(expectedUser);
  });
});

describe('getActiveUsers', () => {
  test('return all active users from state', () => {
    const state = deepFreeze({
      users: [
        { fullName: 'Abc', isActive: true },
        { fullName: 'Def', isActive: false },
        { fullName: 'Xyz', isActive: true },
      ],
    });
    const expectedUsers = [
      { fullName: 'Abc', isActive: true },
      { fullName: 'Xyz', isActive: true },
    ];

    const actualUser = getActiveUsers(state);

    expect(actualUser).toEqual(expectedUsers);
  });
});

describe('getUsersStatusActive', () => {
  test('returns users with presence status set as "active"', () => {
    const state = deepFreeze({
      users: [
        { email: 'abc@example.com', isActive: true },
        { email: 'def@example.com', isActive: true },
        { email: 'xyz@example.com', isActive: true },
      ],
      presence: {
        'abc@example.com': {
          aggregated: {
            status: 'active',
          },
        },
      },
    });
    const expectedUsers = [{ email: 'abc@example.com', isActive: true }];

    const actualUser = getUsersStatusActive(state);

    expect(actualUser).toEqual(expectedUsers);
  });
});

describe('getUsersStatusIdle', () => {
  test('returns users with presence status set as "idle"', () => {
    const state = deepFreeze({
      users: [
        { email: 'abc@example.com', isActive: true },
        { email: 'def@example.com', isActive: true },
        { email: 'xyz@example.com', isActive: true },
      ],
      presence: {
        'abc@example.com': {
          aggregated: {
            status: 'idle',
          },
        },
        'def@example.com': {
          aggregated: {
            status: 'idle',
          },
        },
      },
    });
    const expectedUsers = [
      { email: 'abc@example.com', isActive: true },
      { email: 'def@example.com', isActive: true },
    ];

    const actualUser = getUsersStatusIdle(state);

    expect(actualUser).toEqual(expectedUsers);
  });
});

describe('getUsersStatusOffline', () => {
  test('returns users with presence status set as "offline"', () => {
    const state = deepFreeze({
      users: [
        { email: 'abc@example.com', isActive: true },
        { email: 'def@example.com', isActive: true },
        { email: 'xyz@example.com', isActive: true },
      ],
      presence: {
        'abc@example.com': {
          aggregated: {
            status: 'offline',
          },
        },
        'def@example.com': {
          aggregated: {
            status: 'offline',
          },
        },
        'xyz@example.com': {
          aggregated: {
            status: 'offline',
          },
        },
      },
    });
    const expectedUsers = [
      { email: 'abc@example.com', isActive: true },
      { email: 'def@example.com', isActive: true },
      { email: 'xyz@example.com', isActive: true },
    ];

    const actualUser = getUsersStatusOffline(state);

    expect(actualUser).toEqual(expectedUsers);
  });
});

describe('getUsersByEmail', () => {
  test('return users mapped by their email', () => {
    const state = deepFreeze({
      users: [
        { email: 'abc@example.com' },
        { email: 'def@example.com' },
        { email: 'xyz@example.com' },
      ],
    });
    const expectedResult = {
      'abc@example.com': { email: 'abc@example.com' },
      'def@example.com': { email: 'def@example.com' },
      'xyz@example.com': { email: 'xyz@example.com' },
    };

    const result = getUsersByEmail(state);

    expect(result).toEqual(expectedResult);
  });
});

describe('getUsersById', () => {
  test('return users mapped by their Id', () => {
    const state = deepFreeze({
      users: [
        { id: 1, email: 'abc@example.com' },
        { id: 2, email: 'def@example.com' },
        { id: 3, email: 'xyz@example.com' },
      ],
    });
    const expectedResult = {
      1: { id: 1, email: 'abc@example.com' },
      2: { id: 2, email: 'def@example.com' },
      3: { id: 3, email: 'xyz@example.com' },
    };

    const result = getUsersById(state);

    expect(result).toEqual(expectedResult);
  });
});

describe('getUsersSansMe', () => {
  test('returns all users except current user', () => {
    const state = deepFreeze({
      users: [
        { email: 'me@example.com' },
        { email: 'john@example.com' },
        { email: 'doe@example.com' },
      ],
      accounts: [{ email: 'me@example.com' }],
    });
    const expectedResult = [{ email: 'john@example.com' }, { email: 'doe@example.com' }];

    const actualResult = getUsersSansMe(state);

    expect(actualResult).toEqual(expectedResult);
  });
});
