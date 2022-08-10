import colors from 'colors';
import { Request } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, className = 'CustomError', statusCode = 500) {
    super(message);
    this.name = className;
    this.stack = this.cleanStacktrace(this.stack || '');
    this.statusCode = statusCode;
  }
  
  /**
   * Scrubs references to node_modules from stacktrace to make it more readable
   */
  private cleanStacktrace(stack: string) {
    const newStack = stack.split(/\n/g).filter((line, i) => i == 0 || !line.match(/node_modules/));
    return newStack.join('\n');
  }
}

export class ServerError extends CustomError {
  /**
   * Custom error class for server-side errors
   * @param statusCode Default 500
   */
  constructor(message: string, statusCode = 500) {
    super(message, 'ServerError', statusCode);
  }
}

export class ClientError extends CustomError {
  /**
   * Custom error class for client-side errors
   * @param statusCode Default 400
   */
  constructor(message: string, statusCode = 400) {
    super(message, 'ClientError', statusCode);
  }
}

/**
 * "Zips" together 2 arrays in an alternating fashion.  
 * e.g. `zip([1,3], [2,4]) == [1,2,3,4]`
 */
export function zip<A, B>(a: A[], b: B[]): (A | B)[] {
  return (a.length ? [a[0], ...zip(b, a.slice(1))] : b);
}

/**
 * Logs an error to the console in red
 * @param message
 * @param optionalParams 
 */
export function error(message = '', ...optionalParams: unknown[]) {
  console.error(colors.red(message), ...optionalParams.map(p => colors.red(typeof p === 'string' ? p : JSON.stringify(p))));
}

/**
 * Logs an error to the console in red
 * @param message
 * @param optionalParams 
 */
export function warn(message = '', ...optionalParams: unknown[]) {
  console.warn(colors.yellow(message), ...optionalParams.map(p => colors.yellow(typeof p === 'string' ? p : JSON.stringify(p))));
}

/**
 * Extracts the desired properties from a request body and checks that they are the correct type
 * @param req The Express request
 * @param propTypes An object mapping property names to their expected types
 * @returns The provided properties mapped to their values from the request body
 * @throws {TypeError} If the request body is missing a property or the property is the incorrect type
 */
export function getBodyProps<T extends Record<string, string>>(req: Request, propTypes: T) {
  // Would LOVE to figure out how to have types of values in newProps match up with propTypes
  // e.g. getBodyProps(req, { prop1: 'string', prop2: 'number' }) --> typeof newProps === { prop1: string, prop2: number }
  // Most useful thread I found helping with this was here: https://stackoverflow.com/questions/46247277/how-to-get-type-from-its-string-representation
  const newProps = {} as Record<keyof T, unknown>;
  for (const [key, type] of Object.entries(propTypes)) {
    if (typeof req.body[key] !== type)
      throw new ClientError(`Type "${typeof req.body[key]}" is invalid for property "${key}": "${type}"`);
    else if (req.body[key] === '')
      throw new ClientError(`Required property "${key}" cannot be empty`);

    newProps[key as keyof T] = req.body[key];
  }
  return newProps;
}