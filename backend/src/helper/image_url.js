function PrepareImageUrl(keyword) {
    const name = prepareImageName(keyword)
    return `${process.env.IMAGE_BASE_URL}/${name}/${name}.jpg`
}

function prepareImageName(keyword) {
    return keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase()
}

module.exports = {
    PrepareImageUrl
}