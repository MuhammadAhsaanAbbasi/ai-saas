import TransformationForm from '@/components/shared/Transformation/TransformationForm'
import TransfromHeader from '@/components/shared/Transformation/TransfromHeader'
import { transformationTypes } from '@/constants'
import React from 'react'

const AddTransformationPage = ({params: {type}}: SearchParamProps) => {
  const transformation = transformationTypes[type]
  return (
    <>
    <TransfromHeader
    title={transformation.title}
    subTitle={transformation.subTitle}
    />
    <TransformationForm/>
    </>
  )
}

export default AddTransformationPage