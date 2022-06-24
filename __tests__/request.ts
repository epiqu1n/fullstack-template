import { expect, jest, test } from '@jest/globals';
import request, { ClientError, get, post, ServerError } from '../client/utils/request';

// Mock global fetch to return a specified body and status
type MockRawResponse = {
  body: any,
  status: number
};

type MockResponse = {
  json: () => Promise<any>,
  status: number
};

type MockFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<MockResponse>;

let fetchBody: any;
let fetchResponse: MockRawResponse;

global.fetch = jest.fn<MockFetch>((url, options) => {
  return Promise.resolve<MockResponse>({
    json: () => Promise.resolve(fetchResponse.body),
    status: fetchResponse.status
  });
}) as jest.Mock;

// Begin tests
describe('Request module tests', () => {

  describe('Handling of successful requests', () => {
    beforeAll(() => {
      fetchBody = { test: true };
      fetchResponse = {
        body: fetchBody,
        status: 200
      };
    });

    it('should return the right body for a GET request', async () => {
      const response = await request('/someURL');
      expect(fetch).toHaveBeenCalled();
      expect(response).toEqual(fetchBody);
      // expect()
    });

    // TODO: get method
    // TODO: post method
  });

  describe('Handling of failed requests due to client error', () => {
    beforeAll(() => {
      fetchBody = { test: true };
      fetchResponse = {
        body: fetchBody,
        status: 400
      };
    });

    it('should throw a ClientError when status code is 400-499', async () => {
      let error: any;
      await post('/fail', null).catch(err => error = err);
      expect(error).toBeInstanceOf(ClientError);
    })
  })

});