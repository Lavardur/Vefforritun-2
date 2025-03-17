import { sanitizeInput, sanitizeObject } from '../src/utils/sanitization.js';

describe('Sanitization Utility', () => {
  describe('sanitizeInput', () => {
    it('should escape < and > characters', () => {
      const input = '<script>alert("XSS")</script>';
      const expectedOutput = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
      expect(sanitizeInput(input)).toBe(expectedOutput);
    });

    it('should return the same string if no < or > characters are present', () => {
      const input = 'Hello, World!';
      expect(sanitizeInput(input)).toBe(input);
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize all string properties in an object', () => {
      const input = {
        title: '<h1>Title</h1>',
        content: '<script>alert("XSS")</script>',
        nested: {
          description: '<p>Description</p>',
        },
      };
      const expectedOutput = {
        title: '&lt;h1&gt;Title&lt;/h1&gt;',
        content: '&lt;script&gt;alert("XSS")&lt;/script&gt;',
        nested: {
          description: '&lt;p&gt;Description&lt;/p&gt;',
        },
      };
      expect(sanitizeObject(input)).toEqual(expectedOutput);
    });

    it('should handle non-string properties correctly', () => {
      const input = {
        title: '<h1>Title</h1>',
        views: 100,
        isPublished: true,
        nested: {
          description: '<p>Description</p>',
          tags: ['<tag1>', '<tag2>'],
        },
      };
      const expectedOutput = {
        title: '&lt;h1&gt;Title&lt;/h1&gt;',
        views: 100,
        isPublished: true,
        nested: {
          description: '&lt;p&gt;Description&lt;/p&gt;',
          tags: ['&lt;tag1&gt;', '&lt;tag2&gt;'],
        },
      };
      expect(sanitizeObject(input)).toEqual(expectedOutput);
    });
  });
});