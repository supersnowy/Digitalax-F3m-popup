import { get, post, put } from './request.service'
import axios from 'axios'

class DigitalaxApiService {
  async handleSignUp(account, userName, email, ip) {
    try {
      const message = await post('/register', {
        wallet: account,
        username: userName,
        email,
        ipAddrs: ip
      })
      return message
    } catch (e) {
      return null
    }
  }

  async fetchAuthToken(account) {
    try {
      const data = await post('/account-exists', {
        wallet: account,
      })
      if (data === 0) {
        return ''
      }
      return data
    } catch (e) {
      return ''
    }
  }

  async handleAuthentication(account, signMsg, signature) {
    try {
      const data = await post('/authenticate', {
        wallet: account,
        randomString: signMsg,
        signature
      })
      return data
    } catch (e) {
      return null
    }
  }

  async checkUserName(username) {
    try {
      const isExist = await get('/username-available', {
        username
      })
      return isExist | 0
    } catch (e) {
      return null
    }
  }

  async fetchNfts(account) {
    try {
      const ntfs = await get('/get-nfts', {
        wallet: account
      })
      return ntfs
    } catch (e) {
      return []
    }
  }

  async getProfile() {
    try {
      const user = await get('/profile')
      return user
    } catch (e) {
      return null
    }
  }

  async updateProfile(user) {
    try {
      const data = await put('/profile', user)
      return data
    } catch (e) {
      return null
    }
  }

  async getPresignedUrl() {
    try {
      const data = await get('/presigned-url')
      return data
    } catch (e) {
      return null
    }
  }

  async uploadImageToS3(url, file) {
    try {
      await axios.put(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return true
    } catch (e) {
      return false
    }
  }

  async getMyIP() {
    try {
      const url = 'https://api.ipify.org/?format=json'
      const { data } = await axios.get(url)
      return data.ip
    } catch (e) {
      return ''
    }
  }

  async getViews(viewsType, viewsId) {
    try {
      const views = await get('/get-views-by-id', {
        viewsType,
        viewsId
      })
      return views
    } catch (e) {
      return []
    }
  }

  async getAllUsersName() {
    try {
      const allUsers = await get('/get-all-users-name')
      return allUsers
    } catch (e) {
      return []
    }
  }

  async addLove(account, signMsg, viewsType, viewsId) {
    try {
      const data = await post('/add-love', {
        wallet: account,
        randomString: signMsg,
        viewsType,
        viewsId
      })
      return data
    } catch (e) {
      return null
    }
  }

  async addView(viewsType, viewsId) {
    try {
      const data = await post('/add-view', {
        viewsType,
        viewsId
      })
      return data
    } catch (e) {
      return null
    }
  }

  async getSourceType(name) {
    try {
      const data = await get(`/get-fashion-by-item-name`, { name })
      return data[0]
    } catch (e) {
      throw e
    }
  }

  async getAllDesigners() {
    try {
      const designers = await get('/get-all-designers')
      return designers ? designers.data : []
    } catch (e) {
      return null
    }
  }
}

export default new DigitalaxApiService()
