import { mount } from '@vue/test-utils'
import Spinner from '../../src/components/Spinner.vue'

describe('Spinner', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Spinner)
    const spinner = wrapper.findComponent(Spinner)
    expect(spinner.exists()).toBe(true)
  })
})
