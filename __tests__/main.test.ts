/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

jest.mock('@actions/core')

describe('When running the action', () => {
  const mockSetOutput = core.setOutput as jest.Mock

  test('the output URL is set', async () => {
    await main.run()
    expect(mockSetOutput).toHaveBeenCalledWith(
      'release-url',
      ''
    )
  })
})
