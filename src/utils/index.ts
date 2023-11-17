/**
 * 获取一个范围内的随机数
 * 向上取整
 */
export const getRoundNum = (maxNum: number) => {
  return Math.ceil(Math.random() * maxNum)
}

export const isString = (v: unknown): v is string => typeof v === 'string'
