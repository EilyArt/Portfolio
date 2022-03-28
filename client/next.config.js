/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
}

const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'imgix',
    path: [process.env.NEXT_PUBLIC_API],
  },
}