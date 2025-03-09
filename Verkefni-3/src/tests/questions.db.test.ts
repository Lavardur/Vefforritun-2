import { describe, it, expect, vi } from 'vitest';
import { getQuestions, getQuestion, validateQuestion, createQuestion, deleteQuestion, updateQuestion, getQuestionsByCategory } from '../questions.db.js';
import prisma from '../libs/__mocks__/prisma.js';

vi.mock('../libs/prisma');

describe('Question functions', () => {
  it('should create a question', async () => {
    const newQuestion = { question: 'Test Question', answer: 'This is a test answer.', slug: 'test-question', categorySlug: 'test-category' };
    prisma.questions.create.mockResolvedValue({ ...newQuestion, id: 1 });
    const question = await createQuestion({ question: 'Test Question', answer: 'This is a test answer.', categorySlug: 'test-category' });
    expect(question).toStrictEqual({ ...newQuestion, id: 1 });
  });

  it('should get all questions', async () => {
    const questionsList = [
      { id: 1, question: 'Test Question', answer: 'This is a test answer.', slug: 'test-question', categorySlug: 'test-category' },
      { id: 2, question: 'Another Question', answer: 'This is another answer.', slug: 'another-question', categorySlug: 'test-category' }
    ];
    prisma.questions.findMany.mockResolvedValue(questionsList);
    const questions = await getQuestions();
    expect(questions).toStrictEqual(questionsList);
  });

  it('should get a question by slug', async () => {
    const questionData = { id: 1, question: 'Test Question', answer: 'This is a test answer.', slug: 'test-question', categorySlug: 'test-category' };
    prisma.questions.findUnique.mockResolvedValue(questionData);
    const question = await getQuestion('test-question');
    expect(question).toStrictEqual(questionData);
  });

  it('should validate a question', () => {
    const result = validateQuestion({ question: 'Valid Question', answer: 'This is a valid answer.', categorySlug: 'test-category' });
    expect(result.success).toBe(true);
  });

  it('should delete a question', async () => {
    const questionData = { id: 1, question: 'Test Question', answer: 'This is a test answer.', slug: 'test-question', categorySlug: 'test-category' };
    prisma.questions.delete.mockResolvedValue(questionData);
    const deletedQuestion = await deleteQuestion('test-question');
    expect(deletedQuestion).toStrictEqual(questionData);
  });

  it('should update a question', async () => {
    const questionData = { id: 1, question: 'Another Question', answer: 'This is another answer.', slug: 'another-question', categorySlug: 'test-category' };
    const updatedQuestionData = { id: 1, question: 'Updated Question', answer: 'This is an updated answer.', slug: 'updated-question', categorySlug: 'test-category' };
    prisma.questions.update.mockResolvedValue(updatedQuestionData);
    const updatedQuestion = await updateQuestion(questionData.slug, { question: 'Updated Question', answer: 'This is an updated answer.', categorySlug: 'test-category' });
    expect(updatedQuestion).toStrictEqual(updatedQuestionData);
  });

  it('should get questions by category', async () => {
    const questionsList = [
      { id: 1, question: 'Test Question', answer: 'This is a test answer.', slug: 'test-question', categorySlug: 'test-category' },
      { id: 2, question: 'Another Question', answer: 'This is another answer.', slug: 'another-question', categorySlug: 'test-category' }
    ];
    prisma.questions.findMany.mockResolvedValue(questionsList);
    const questions = await getQuestionsByCategory('test-category');
    expect(questions).toStrictEqual(questionsList);
  });
});