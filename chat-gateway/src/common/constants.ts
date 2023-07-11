export const MESSAGE_STATUSES = {
  SENT: 100,
  DELIVERED: 200,
  READ: 300,
};

export const SERVICES = {
  USER: 'user',
  CHAT: 'chat',
};

export const ERRORS = {
  VALIDATION_FAILED: {
    code: 1,
    error: 'ValidationFailed',
  },
  SERVICE_CALLER_ERROR: {
    code: 2,
    error: 'ServiceCallerError',
  },
};
