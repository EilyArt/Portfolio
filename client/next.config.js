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
    domains: ['eilyaamin.com', 'www.eilyaamin.com'],
    loader: 'imgix',
    path: [process.env.NEXT_PUBLIC_API],
  },
}

module.exports = {
  env: {
    NEXT_PUBLIC_API: 'http://54.236.147.64:8000/'
  }
}