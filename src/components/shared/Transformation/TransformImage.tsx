import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import download from "../../../../public/assets/icons/download.svg"
import { CldImage } from 'next-cloudinary'
import { dataUrl, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
const TransformImage = ({ image, type, title, isTransforming,
    transformationConfig, setIsTransforming, hasDownload = true }: TransformedImageProps) => {
    const downloadHandler = () => {

    }
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex-between">
                <h3 className='h3-bold text-slate-700'>Transformed</h3>
                {hasDownload && (
                    <Button className='download-btn' onClick={() => downloadHandler}>
                        <Image
                            src={download}
                            alt='download icon'
                            height={24}
                            width={24}
                            className='pb-[6px]'
                        />
                    </Button>
                )}
            </div>
            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId} 
                        alt='Images'
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className='media-uploader_cldImage'
                    />
                </div>
            ) : (
                <div className='transformed-placeholder'>
                    Transformed Image
                </div>
            )}
        </div>
    )
}

export default TransformImage