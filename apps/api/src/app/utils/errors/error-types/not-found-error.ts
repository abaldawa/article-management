/**
 * @author Abhijit Baldawa
 */

class NotfoundError extends Error {
  public details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.details = details;
  }
}

export { NotfoundError };
