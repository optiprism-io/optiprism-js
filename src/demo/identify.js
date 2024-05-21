const TEST_USER_ID = 'user1'

const TEST_COMPANY_NAME = 'Company'
const TEST_COMPANY_ID = 'campaign1'
const TEST_COMPANY_PROPS = {
  prop1: 'test',
}

const TEST_PROJECT_NAME = 'Project'
const TEST_PROJECT_ID = 'project1'

const identifyUserBtn = document.querySelectorAll('[data-identify-user]')[0]
const identifyCompanyBtn = document.querySelectorAll('[data-identify-company]')[0]
const identifyGroupBtn = document.querySelectorAll('[data-identify-project]')[0]

identifyUserBtn.addEventListener('click', () => {
  globalThis.optiprism.user.identify(TEST_USER_ID)
})

identifyCompanyBtn.addEventListener('click', () => {
  globalThis.optiprism.group.identify(TEST_COMPANY_NAME, TEST_COMPANY_ID, TEST_COMPANY_PROPS)
})

identifyGroupBtn.addEventListener('click', () => {
  globalThis.optiprism.group.identify(TEST_PROJECT_NAME, TEST_PROJECT_ID)
})
