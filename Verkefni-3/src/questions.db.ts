import { z } from 'zod';
import prisma from './libs/prisma.js';
import xss from 'xss';

const QuestionSchema = z.object({
    id: z.number(),
    question: z
      .string()
      .min(3, 'title must be at least three letters')
      .max(1024, 'title must be at most 1024 letters'),
    answer: z
    .string()
    .min(3, 'title must be at least three letters')
    .max(1024, 'title must be at most 1024 letters'),
    slug: z.string(),
    categorySlug: z.string()
  });
  
  const QuestionToCreateSchema = z.object({
    question: z
      .string()
      .min(3, 'title must be at least three letters')
      .max(1024, 'title must be at most 1024 letters'),
    answer: z
      .string()
      .min(3, 'title must be at least three letters')
      .max(1024, 'title must be at most 1024 letters'),
    categorySlug: z.string()
  });

type Question = z.infer<typeof QuestionSchema>;
type QuestionToCreate = z.infer<typeof QuestionToCreateSchema>;

export async function getQuestions(): Promise<Array<Question>> {
    const questions = await prisma.questions.findMany();
    console.log('questions :>> ', questions);
    return questions;
}

export async function getQuestion(slug: string): Promise<Question | null> {
    const question = await prisma.questions.findUnique({
        where: { slug },
    });
    
    return question;
}

export function validateQuestion(questionToValidate: unknown) {
    const result = QuestionToCreateSchema.safeParse(questionToValidate);

    return result;
}

export async function createQuestion(questionToCreate: QuestionToCreate): Promise<Question> {
    const createdQuestion = await prisma.questions.create({
        data: {
            question: xss(questionToCreate.question), 
            answer: xss(questionToCreate.answer), 
            slug: xss(questionToCreate.question.toLowerCase().replace(' ', '-')),
            categorySlug: questionToCreate.categorySlug
        },
    });

    return createdQuestion;
}

export async function deleteQuestion(slug: string): Promise<Question | null> {
    const deletedQuestion = await prisma.questions.delete({
        where: { slug },
    });
    
    return deletedQuestion; 
}

export async function updateQuestion(slug: string, questionToUpdate: QuestionToCreate): Promise<Question | null> {
    const updatedQuestion = await prisma.questions.update({
        where: { slug },
        data: {
            question: xss(questionToUpdate.question), 
            answer: xss(questionToUpdate.answer), 
            slug: xss(questionToUpdate.question.toLowerCase().replace(' ', '-')),
            categorySlug: questionToUpdate.categorySlug
        },
    });
    
    return updatedQuestion; 
}

export async function getQuestionsByCategory(categorySlug: string): Promise<Array<Question>> {
    const questions = await prisma.questions.findMany({
        where: {
            categorySlug
        }
    });
    return questions;
}