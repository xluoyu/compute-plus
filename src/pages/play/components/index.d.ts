import type Question from './Question.vue'
import type Countdown from './Countdown.vue'
import type Result from './Result/index.vue'

export type QuestionInstance = InstanceType<typeof Question>

export type CountdownInstance = InstanceType<typeof Countdown>

export type ResultInstance = InstanceType<typeof Result>
