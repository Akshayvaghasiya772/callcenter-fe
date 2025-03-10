import LeadForm from '@/components/leadForm'
import React from 'react'

const index = () => {
return (
    <>
        <LeadForm/>
    </>
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