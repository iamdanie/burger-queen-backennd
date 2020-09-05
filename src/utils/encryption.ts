import crypto from 'crypto'

const { ENCRYPTION_KEY, ENCRYPTION_ALGORITHM } = require('../../config/security.json')
const vector = crypto.randomBytes(16)

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY), vector)
    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()])

    return `${vector.toString('hex')}:${encryptedText.toString('hex')}`
}

export const decrypt = (text: string) => {
    const segments = text.split(':')
    const vector = segments[0]
    const encryptedText = segments[1]

    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(vector, 'hex'))
    const decryptedText = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()])

    return decryptedText.toString()
}