import { Token } from 'typedi'
import { PaktConfig } from './config'

export const PAKT_CONFIG = new Token<PaktConfig>('PAKT_CONFIG');
export const AUTH_TOKEN = new Token<string>('AUTH_TOKEN');
export const TEMP_TOKEN = new Token<string>('TEMP_TOKEN')