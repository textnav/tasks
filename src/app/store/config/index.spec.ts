import * as fromConfigSelector from './'

describe('Config Selectors', () => {
  it('should return whether completed tasks are visible', () => {
    expect(
      fromConfigSelector.selectCompletedVisible.projector({
        isCompletedVisible: true
      })
    ).toEqual(true)
  })
})
