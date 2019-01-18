import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import FileTree from '../../../src/renderer/components/FileTree.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('FileTree.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      change_current_file: () => true,
      toggle_visibility: () => true
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('creates the tree properly', () => {
    const wrapper = mount(FileTree, {
      store,
      localVue,
      propsData: {
        files: [{id: 1, name: 'root', isFolder: true, subfolders: []}]
      }
    })
    expect(wrapper.contains('span')).to.equal(true)
  })
})
