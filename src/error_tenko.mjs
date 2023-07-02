// This error is thrown for errors that are thrown while parsing with Tenko
export class TenkoError extends Error {
  toString() {
    return 'Tenko' + super.toString();
  }
}
