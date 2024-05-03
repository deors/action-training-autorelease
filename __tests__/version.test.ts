import * as version from '../src/version'

describe('checking for valid SemVer tags', () => {
  it('returns true for a valid SemVer tag', () => {
    // Arrange
    const tag = 'v1.2.3'
    // Act
    const result = version.isSemVer(tag)
    // Assert
    expect(result).toBe(true)
  })
  it('returns fasle for an invalid SemVer tag', () => {
    // Arrange
    const tag = 'v1.1'
    // Act
    const result = version.isSemVer(tag)
    // Assert
    expect(result).toBe(false)
  })
  it('returns true for an valid prerelease SemVer tag', () => {
    // Arrange
    const tag = 'v1.2.3-rc.1'
    // Act
    const result = version.isSemVer(tag)
    // Assert
    expect(result).toBe(true)
  })
})

describe('checking for prerelease tags', () => {
  it('returns true for a prerelease tag with rc suffix', () => {
    // Arrange
    const tag = 'v1.2.3-rc.1'
    // Act
    const result = version.isPrerelease(tag)
    // Assert
    expect(result).toBe(true)
  })
  it('returns true for a prerelease tag with alpha suffix', () => {
    // Arrange
    const tag = 'v1.2.3-alpha.3'
    // Act
    const result = version.isPrerelease(tag)
    // Assert
    expect(result).toBe(true)
  })
  it('returns false for a non-prerelease tag', () => {
    // Arrange
    const tag = 'v1.2.3'
    // Act
    const result = version.isPrerelease(tag)
    // Assert
    expect(result).toBe(false)
  })
})

describe('removing the v prefix from tags', () => {
  it('returns the tag without the v prefix', () => {
    // Arrange
    const tag = 'v1.2.3'
    // Act
    const result = version.removePrefix(tag)
    // Assert
    expect(result).toBe('1.2.3')
  })
  it('returns the tag as-is if it does not start with a v', () => {
    // Arrange
    const tag = '1.2.3'
    // Act
    const result = version.removePrefix(tag)
    // Assert
    expect(result).toBe('1.2.3')
  })
  it('returns the tag as-is if it does not conform to SemVer format', () => {
    // Arrange
    const tag = 'somethingElse'
    // Act
    const result = version.removePrefix(tag)
    // Assert
    expect(result).toBe('somethingElse')
  })
})
