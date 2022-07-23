import MonkeyTypeSDK from '../src/index';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const monkeyTypeSDK = new MonkeyTypeSDK(process.env.APE_KEY);

describe("Errors", () => {
  test('Is SDK gives error when APE Key is not present', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => new MonkeyTypeSDK()).toThrowError('APE(API) key is required');
  });
})

describe('Users', () => {
  test('Gets a user\'s personal best data', async () => {
    const response = await monkeyTypeSDK.users.personalBests({
      mode: 'time',
      mode2: '60'
    });
    
    expect(response[0].acc).toBeDefined();
  })

  test('Gets a user\'s typing stats data', async () => {
    const response = await monkeyTypeSDK.users.stats();
    expect(response.completedTests).toBeDefined();
  })
})

describe('Leaderboards', () => {
  test('Gets a leaderboard', async () => {
    const response = await monkeyTypeSDK.leaderboards.get({
      language: 'english',
      mode: 'time',
      mode2: '60'
    });
    expect(response[0].acc).toBeDefined();
  })

  test('Gets a user\'s rank', async () => {
    const response = await monkeyTypeSDK.leaderboards.getUsersRank({
      language: 'english',
      mode: 'time',
      mode2: '60'
    });
    
    expect(response).toBeDefined();
  })
})

describe('Results', () => {
  test('Gets last result', async () => {
    const response = await monkeyTypeSDK.results.getLastResult();
    expect(response._id).toBeDefined();
  })
})

