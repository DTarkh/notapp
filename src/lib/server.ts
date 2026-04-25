import { createServerFn } from '@tanstack/react-start'
import { and, asc, desc, eq, ilike, or } from 'drizzle-orm'
import { db } from '#/db'
import { notes, user } from '#/db/schema'
import { authMiddleware } from './middleware'
import {
  createNoteInput,
  listNotesInput,
  noteIdInput,
  slugInput,
  updateNoteInput,
} from './schemas/notes'
import { generateSlug } from './slug'

export const getUser = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.user
  })

const requireUser = (ctx: { user: { id?: string } }) => {
  if (!ctx.user.id) throw new Error('UNAUTHORIZED')
  return ctx.user.id
}

/** All public notes across every user, with author display fields (signed-in callers only). */
export const getAllNotes = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    requireUser(context)
    const rows = await db
      .select({
        id: notes.id,
        userId: notes.userId,
        title: notes.title,
        content: notes.content,
        isPublic: notes.isPublic,
        publicSlug: notes.publicSlug,
        createdAt: notes.createdAt,
        updatedAt: notes.updatedAt,
        authorName: user.name,
        authorEmail: user.email,
        authorImage: user.image,
      })
      .from(notes)
      .innerJoin(user, eq(notes.userId, user.id))
      .where(eq(notes.isPublic, true))
      .orderBy(desc(notes.createdAt))

    return rows.map(
      ({
        authorName,
        authorEmail,
        authorImage,
        id,
        userId,
        title,
        content,
        isPublic,
        publicSlug,
        createdAt,
        updatedAt,
      }) => ({
        id,
        userId,
        title,
        content,
        isPublic,
        publicSlug,
        createdAt,
        updatedAt,
        author: {
          name: authorName,
          email: authorEmail,
          image: authorImage,
        },
      }),
    )
  })

export const getNotes = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .inputValidator(listNotesInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const order = data.sort === 'oldest' ? asc : desc
    const where = data.search
      ? and(
          eq(notes.userId, userId),
          or(
            ilike(notes.title, `%${data.search}%`),
            ilike(notes.content, `%${data.search}%`),
          ),
        )
      : eq(notes.userId, userId)
    return db.select().from(notes).where(where).orderBy(order(notes.createdAt))
  })

export const getNote = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .inputValidator(noteIdInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const row = (await db.select().from(notes).where(eq(notes.id, data.id))).at(
      0,
    )
    if (!row) throw new Error('NOT_FOUND')
    if (row.userId !== userId) throw new Error('FORBIDDEN')
    return row
  })

export const createNote = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(createNoteInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const [row] = await db
      .insert(notes)
      .values({ id: crypto.randomUUID(), userId, ...data })
      .returning()
    return row
  })

export const updateNote = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(updateNoteInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const row = (
      await db
        .update(notes)
        .set({
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        })
        .where(and(eq(notes.id, data.id), eq(notes.userId, userId)))
        .returning()
    ).at(0)
    if (!row) throw new Error('NOT_FOUND_OR_FORBIDDEN')
    return row
  })

export const deleteNote = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(noteIdInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const res = await db
      .delete(notes)
      .where(and(eq(notes.id, data.id), eq(notes.userId, userId)))
      .returning({ id: notes.id })
    if (res.length === 0) throw new Error('NOT_FOUND_OR_FORBIDDEN')
    return { id: data.id }
  })

export const toggleShare = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(noteIdInput)
  .handler(async ({ data, context }) => {
    const userId = requireUser(context)
    const existing = (
      await db.select().from(notes).where(eq(notes.id, data.id))
    ).at(0)
    if (!existing) throw new Error('NOT_FOUND')
    if (existing.userId !== userId) throw new Error('FORBIDDEN')

    const row = (
      await db
        .update(notes)
        .set({
          isPublic: !existing.isPublic,
          publicSlug: existing.publicSlug ?? generateSlug(),
          updatedAt: new Date(),
        })
        .where(eq(notes.id, data.id))
        .returning()
    ).at(0)
    if (!row) throw new Error('NOT_FOUND')
    return row
  })

export const getPublicNote = createServerFn({ method: 'GET' })
  .inputValidator(slugInput)
  .handler(async ({ data }) => {
    const row = (
      await db
        .select({
          id: notes.id,
          title: notes.title,
          content: notes.content,
          createdAt: notes.createdAt,
          updatedAt: notes.updatedAt,
        })
        .from(notes)
        .where(and(eq(notes.publicSlug, data.slug), eq(notes.isPublic, true)))
    ).at(0)
    if (!row) throw new Error('NOT_FOUND')
    return row
  })
