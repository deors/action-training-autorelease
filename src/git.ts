import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { ExecOptions } from 'child_process'

export async function getChangesIntroducedByTag(tag: string): Promise<string> {
  const previousTag = await getPreviousTag(tag)
  return previousTag
    ? getCommitMessagesBetween(previousTag, tag)
    : getCommitMessagesFrom(tag)
}

export async function getPreviousTag(tag: string): Promise<string | null> {
  let previousTag = ''
  const options: exec.ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        previousTag += data.toString()
      }
    },
    silent: true,
    ignoreReturnCode: true
  }
  const exitCode = await exec.exec(
    'git',
    [
      'describe',
      '--match',
      'v[0-9]*',
      '--abbrev=0',
      '--first-parent',
      `${tag}^`
    ],
    options
  )
  core.debug(`The previous tag is ${previousTag}`)
  return exitCode === 0 ? previousTag.trim() : null
}

export async function getCommitMessagesBetween(
  from: string,
  to: string
): Promise<string> {
  let commitMessages = ''
  const options: exec.ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        commitMessages += data.toString()
      }
    },
    silent: true
  }
  await exec.exec('git', ['log', '--format=%s', `${from}..${to}`], options)
  core.debug(
    `The commit messages between ${from} and ${to} are ${commitMessages}`
  )
  return commitMessages.trim()
}

export async function getCommitMessagesFrom(tag: string): Promise<string> {
  let commitMessages = ''
  const options: exec.ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        commitMessages += data.toString()
      }
    },
    silent: true
  }
  await exec.exec('git', ['log', '--format=%s', `${tag}`], options)
  core.debug(`The commit messages from ${tag} are ${commitMessages}`)
  return commitMessages.trim()
}
