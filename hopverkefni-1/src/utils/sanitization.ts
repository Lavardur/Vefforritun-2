export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      default:
        return char;
    }
  });
};

export const sanitizeObject = (obj: Record<string, any>): Record<string, any> => {
  const sanitizedObj: Record<string, any> = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitizedObj[key] = sanitizeInput(obj[key]);
    } else if (Array.isArray(obj[key])) {
      sanitizedObj[key] = obj[key].map((item) => (typeof item === 'string' ? sanitizeInput(item) : item));
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizedObj[key] = sanitizeObject(obj[key]);
    } else {
      sanitizedObj[key] = obj[key];
    }
  }
  return sanitizedObj;
};