import TransformationForm from '@/components/shared/Transformation/TransformationForm'
import TransfromHeader from '@/components/shared/Transformation/TransfromHeader'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const AddTransformationPage = async ({params: {type}}: SearchParamProps) => {
  const transformation = transformationTypes[type]
  const {userId} = auth()
  if(!userId) redirect("/sign-in")
  const user = await getUserById(userId)
  return (
    <>
    <TransfromHeader
    title={transformation.title}
    subTitle={transformation.subTitle}
    />
    <section className='mt-8'>
    <TransformationForm
    action='Add'
    userId={user._id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user.creditBalance}
    />
    </section>
    </>
  )
}

export default AddTransformationPage