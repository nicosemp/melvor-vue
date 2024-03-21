import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar', () => {
  const width = 75

  it('renders properly with width and no animation', () => {
    const wrapper = mount(ProgressBar, { props: { width } })

    expect(wrapper.find('.progress').classes()).toContain('animate-v2')
  })

  it('applies the correct width based on the width prop', () => {
    const wrapper = mount(ProgressBar, { props: { width } })

    const progressBarElement = wrapper.find('.progress')
    expect(progressBarElement.attributes('style')).toContain(`width: ${width}%`)
  })
})
