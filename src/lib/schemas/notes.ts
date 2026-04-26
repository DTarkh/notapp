import { z } from 'zod'

const titleField = z.string().trim().min(1, 'Title is required').max(200)
const contentField = z.string().max(100_000)

export const noteId = z.string().uuid()
export const noteSlug = z.string().min(6).max(12)

export const createNoteInput = z.object({
  /** When set, used for the new row (keeps client optimistic + server in sync). */
  id: noteId.optional(),
  title: titleField,
  content: contentField,
})

export const updateNoteInput = z.object({
  id: noteId,
  title: titleField,
  content: contentField,
})

export const noteIdInput = z.object({ id: noteId })
export const slugInput = z.object({ slug: noteSlug })

export const listNotesInput = z.object({
  search: z.string().trim().max(200).optional(),
  sort: z.enum(['newest', 'oldest']).default('newest'),
  isPublic: z.boolean().optional(),
})

export type CreateNoteInput = z.infer<typeof createNoteInput>
export type UpdateNoteInput = z.infer<typeof updateNoteInput>
export type ListNotesInput = z.infer<typeof listNotesInput>
