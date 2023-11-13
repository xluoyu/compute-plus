import type { IMethods } from '~/common.d'
/**
 * 各个难度的默认配置
 */
export const defaultLevelConfig: Record<number, {
  range: number
  methods: IMethods[]
  accuracy: number
  questionNum: number
}> = {
  1: {
    range: 10,
    methods: ['+'],
    questionNum: 10,
    accuracy: 70,
  },
  2: {
    range: 20,
    methods: ['+', '-'],
    questionNum: 15,
    accuracy: 80,
  },
  3: {
    range: 20,
    methods: ['+', '-', '*', '/'],
    questionNum: 20,
    accuracy: 85,
  },
}

export type IDefaultLevelConfigKeys = keyof typeof defaultLevelConfig
