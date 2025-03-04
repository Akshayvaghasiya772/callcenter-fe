import { requireAuthentication } from '@/utils/utils';
import React from 'react'

const index = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default index

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: { session },
    };
  });
}