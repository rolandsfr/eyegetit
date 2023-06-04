const axios = require('axios')

function PrepareImageUrl(keyword) {
    if (!keyword) {
        return ''
    }
    const name = prepareImageName(keyword)
    return`${process.env.IMAGE_BASE_URL}/${name}/${name}.jpg`
}

function ValidateImageUrl(url) {
    return axios.head(url)
        .then((response) => {
            if (response.status === 200) {
                return url
            }
            return ''
        })
        .catch((error) => {
            if (error.response.status === 404) {
                console.log('image not found:', url)
            } else {
                console.error(error)
            }
            return ''
        })
}

function prepareImageName(keyword) {
    return keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase()
}

module.exports = {
    PrepareImageUrl,
    ValidateImageUrl
}