import React from 'react'
import {mount, render} from 'enzyme'
import Toggle from '../toggle'

test('the component renders with defaults', () => {
  const wrapper = renderToggle()
  expect(wrapper).toMatchSnapshotWithGlamor()
})
test('onToggle function is call when button is clicked', () => {
  const onToggle = jest.fn()
  const wrapper = mountToggle(
    {
      onToggle,
    },
  )
  const button = wrapper.find(`[data-test="button"]`)
  expect(wrapper).toMatchSnapshotWithGlamor('1. Before toogle')
  button.simulate('click')
  expect(wrapper).toMatchSnapshotWithGlamor('2. After toogle')
  expect(onToggle).toHaveBeenCalledTimes(1)
  expect(onToggle).toHaveBeenCalledWith(true)
})

function renderToggle(props = {}) {
  const propsToUser = Object.assign(
    {
      onToggle() {},
      children: 'Child',
    },
    props,
  )
  return render(<Toggle {...propsToUser} />)
}

function mountToggle(props = {}) {
  const propsToUser = Object.assign(
    {
      onToggle() {},
      children: 'Child',
    },
    props,
  )
  return mount(<Toggle {...propsToUser} />)
}
