import * as github from '@actions/github'
import * as core from '@actions/core'
import * as version from './version'
import * as markdown from './markdown'
import { release } from 'os'

export async function createReleaseDraft(
  tag: string,
  githubToken: string,
  changeLog: string
): Promise<string> {
  const octokit = github.getOctokit(githubToken)

  const releaseResponse = await octokit.rest.repos.createRelease({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    tag_name: tag,
    name: version.removePrefix(tag),
    body: markdown.toUnorderedList(changeLog),
    prerel: version.isPrerelease(tag),
    draft: true
  })

  if (releaseResponse.status != 201) {
    throw new Error(
      `Failed to create a release draft: ${releaseResponse.status}`
    )
  }

  core.info(`Created release draft: ${releaseResponse.data.name}`)

  return releaseResponse.data.html_url
}
