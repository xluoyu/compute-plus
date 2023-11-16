/**
 * 题目描述
 */
export interface IQuestion {
  i: number
  a: number
  b: number
  fn: string
  answer: number
}

/**
 * 运算规则
 */
export type IMethods = '+' | '-' | '*' | '/'

/**
 * 题目生成的条件
 *
 * type: => ’normal‘ 闯关模式， ’endless‘ 无尽模式， ’diy‘ 自定义
 */
export interface INormalOptions {
  type: 'normal'
  level: number
  range: number // 取值范围
  preNum: number // 前置题目数量
  methods: IMethods[]
  accuracy: number // 正确率 取百分比
  questionNum: number // 题目数量
}

export interface IEndlessOptions {
  type: 'endless'
  errNumber: number // 错误数量
  preNum: number
  methods: IMethods[]
}

export interface IDiyOptions {
  type: 'diy'
  methods: IMethods[]
  range: number
  preNum: number
  successType: 'normal' | 'endless' // 按照闯关模式的通关条件, 按照无尽模式的通关条件
  accuracy?: number // 准确率
  questionNum?: number // 题目数量
  errNumber?: number // 错误数量
}

export type ICreateQuestionOptions = INormalOptions | IEndlessOptions | IDiyOptions

/**
 * 计分方式
 *
 * 百分比 / 得分
 */
export type IScoreType = 'percentage' | 'score'

export interface IResultOptions {
  type: IScoreType
  num: number
  nextFn?: Function | undefined
  result: boolean
}
