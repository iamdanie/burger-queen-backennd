import Menu from './../sqlz/models/menu'

export async function findAll(): Promise<any> {
  try {
    return await Menu.findAll()
  } catch (error) {
    throw error
  }
}
