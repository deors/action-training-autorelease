import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as github from './github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github-token')
    const tag = event.getCreatedTag()
    let releaseUrl = ''
    if (tag && version.isSemVer(tag)) {
      core.info(`The tag ${tag} is a valid SemVer version`)
      const changeLog = await git.getChangesIntroducedByTag(tag)
      releaseUrl = await github.createReleaseDraft(tag, githubToken, changeLog)
    }

    core.setOutput('release-url', releaseUrl)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
