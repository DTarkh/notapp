import { customAlphabet } from 'nanoid'

const nano = customAlphabet('23456789abcdefghjkmnpqrstuvwxyz', 8)

export const generateSlug = () => nano()
