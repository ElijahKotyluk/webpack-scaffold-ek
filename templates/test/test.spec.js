import { mount } from '@vue/test-utils'
import HelloWorld from '../src/js/components/HelloWorld.vue'

describe('HelloWorld', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(HelloWorld)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})