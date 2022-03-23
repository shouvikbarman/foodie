module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['c.tenor.com','res.cloudinary.com'],
  },
  env: {
    BASE_URL:process.env.BASE_URL,
    mid:process.env.mid,
    mkey:process.env.mkey
  }
}
