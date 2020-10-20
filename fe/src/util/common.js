import { SITE_MENU } from '@/util/constants'

function getSiteMenu () {
  return SITE_MENU
}

function intToMnyFormat (int) {
  if (int === null) {
    return null
  }
  return String(int).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function checkEmailFormat (email) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  if (!regExp.test(email)) {
    return false
  }
  return true
}

export { getSiteMenu, intToMnyFormat, checkEmailFormat }
