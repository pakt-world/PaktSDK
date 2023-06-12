import { Token } from 'typedi'
import { PaktConfig } from './config'

export const PAKT_CONFIG = new Token<PaktConfig>('PAKT_CONFIG');