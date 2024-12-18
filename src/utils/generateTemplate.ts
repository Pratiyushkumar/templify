export const generateTemplates = (headers: string[]) => {
  return {
    'Basic Information': headers
      .map((header) => `${header}: @${header}`)
      .join(', '),
    'Prettier Format': headers
      .map((header) => `${header}: @${header}`)
      .join('\n'),
    'Identifier Format': `Identifier: ${headers
      .map((h) => `@${h}`)
      .join('-')}, ${headers
      .map((header) => `${header}: @${header}`)
      .join(', ')}`,
    'CSV Export Format': headers
      .map((header) => `${header}: @${header}`)
      .join(', '),
  };
};
