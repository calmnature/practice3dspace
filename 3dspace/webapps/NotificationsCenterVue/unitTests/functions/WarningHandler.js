function warnToAvoid(arg, messageToAvoid) {
  return arg?.toString()
    .includes(messageToAvoid)
    || arg?.message?.includes(messageToAvoid);
}

export function createFilteredConsoleError(originalError) {
  return function (...args) {
    if (warnToAvoid(args[0], 'Error loading icon') || warnToAvoid(args[0], 'Error loading nls')) {
      return;
    }
    originalError.call(console, ...args);
  };
}
