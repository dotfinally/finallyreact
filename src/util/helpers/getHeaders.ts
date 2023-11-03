/**
 * Get list of all headers on the page and return a list
 * For example:
 * [
 *   {
 *     level: 'h1',
 *     text: 'Header 1',
 *     id: 'header-1'
 *   },
 *   {
 *     level: 'h2',
 *     text: 'Header 2',
 *     id: 'header-2'
 *   },
 *   {
 *     level: 'h1',
 *     text: 'Header 1-2',
 *     id: 'header-1-2'
 *   }
 * ]
 */
export function getHeaders(
  refId: string
): {
  level: string;
  text: string;
  id: string;
}[] {
  if (!window) {
    return [];
  }

  const headers = window?.document?.querySelectorAll(`#${refId} h1, #${refId} h2, h3, h4, h5, h6`);

  if (!headers) {
    return [];
  }

  const headersArr = Array.from(headers);

  const headersList = headersArr.map((header) => {
    return {
      level: header.tagName.toLowerCase(),
      text: header.textContent,
      id: header.id
    };
  });

  return headersList;
}
