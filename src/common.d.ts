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
export type ICreateQuestionOptions = {
  type: 'normal'
  range: number // 取值范围
  methods: IMethods[]
  accuracy: number // 正确率 取百分比
  questionNum: number // 题目数量
} | {
  type: 'endless'
  errNumber: number // 错误数量
  methods: IMethods[]
} | ({
  type: 'diy'
  methods: IMethods[]
} & ({
  range: number
  successType: 'normal' // 按照闯关模式的通关条件
  accuracy: number // 准确率
  questionNum: number // 题目数量
} | {
  successType: 'endless' // 按照无尽模式的通关条件
  errNumber: number // 错误数量
}))
