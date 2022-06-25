export class RequestError extends Error {
  statusCode: number;

  /**
   * Custom error class for fetch request errors
   * @param statusCode Default 500
   */
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class ServerError extends RequestError {
  /**
   * Error class indicating that an error occurred at the fault of the server
   * @param statusCode Default 500
   */
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
  }
}

export class ClientError extends RequestError {
  /**
   * Error class indicating that an error occurred at the fault of the client
   * @param statusCode Default 400
   */
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}

type ResponseBody = {
  warning?: string,
  error?: string
};

/**
 * Fetch request wrapper with built in response parsing and error handling
 * @throws {ServerError | ClientError} with message that can be displayed to the client
 */
export default async function request(url: RequestInfo | URL, options?: RequestInit) {
  // Make request
  let response, data: ResponseBody;
  try {
    response = await fetch(url, options);
    data = await response.json();
  } catch (err) {
    console.error(err);
    throw new Error('An unknown error occurred while contacting server');
  }

  // Throw an error if status code >= 400
  if (response.status >= 400) {
    console.error(`An error was returned by request to ${url}:`, data.error);
    if (response.status >= 500) throw new ServerError(data.error || data.warning);
    else throw new ClientError(data.error || data.warning);
  }

  return data;
}

/**
 * Fetch GET request wrapper with built in response parsing and error handling
 * @throws {ServerError | ClientError} with message that can be displayed to the client
 */
export async function get(url: RequestInfo | URL, options?: RequestInit) {
  return request(url, options);
}

/**
 * Fetch POST request wrapper with built in response parsing and error handling
 * @throws {ServerError | ClientError} with message that can be displayed to the client
 */
export async function post(url: RequestInfo | URL, body: Record<string, unknown>, options?: RequestInit) {
  const defaultOpts: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const opts = Object.assign(defaultOpts, options);
  
  return request(url, opts);
}