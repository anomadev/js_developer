import { shallowMount } from '@vue/test-utils'
import App from '@/App'
import { mockService } from '../../public/mockCall'

describe('Fetching data from mock service', () => {
  test('Testing the data from resolved promise', () => {
    const data = {
      "mock": []
    }

    expect.assertions(1)
    const res = mockService()
    expect(Promise.resolve(res)).resolves.toBe(data)
  })
})