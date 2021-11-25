import type { NextPage } from 'next'
import Layout from '@/components/Layout'

interface Props {
}

const index: NextPage<Props> = () => {
  return (
    <Layout>
      <div className='pad-default'>
        HomePage
      </div>
    </Layout>
  )
}

export default index
