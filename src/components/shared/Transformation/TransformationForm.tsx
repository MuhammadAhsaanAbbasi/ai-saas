"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { useState, useTransition } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"

export const formSchema = z.object({
    title: z.string().min(2).max(50),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {

    const transformationType = transformationTypes[type]

    const [image, setImage] = useState(data);
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformingConfig, setTransformingConfig] = useState(config);
    const [isPending, startTransition] = useTransition()

    const initialValues = data && action === "Update" ? {
        title: data.title,
        aspectRatio: data.aspectRatio,
        color: data.color,
        prompt: data.prompt,
        publicId: data.publicId,
    } : defaultValues

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    // Select Field
    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]
        setImage((prevState: any) => ({
            ...prevState,
            width: imageSize.width,
            height: imageSize.height,
        }))
        setNewTransformation(transformationType.config)
        return onChangeField(value)
    }

    const onInputChangeHandler = (fieldName: string, value: string, type:string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: {...prevState?.[type], 
                    [fieldName === 'prompt' ? 'prompt' : "to"]: 
                    value},
            }))
            return onChangeField(value)
        }, 100)
    }

    const onTransformHandler = () => {
        setIsTransforming(true)
        setTransformingConfig(deepMergeObjects(newTransformation, transformingConfig))
        setNewTransformation(null)
        startTransition(async() => {
            // await updateCredits(userId, creditFee)
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => (
                        <Input {...field} className="input-field" />
                    )}
                />

                {/* Select Query */}
                {type === 'fill' && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel="Aspect Ratio"
                        className="w-full"
                        render={({ field }) => (
                            <Select
                                onValueChange={(value: any) => onSelectFieldHandler(value, field.onChange)}
                                value={field.value}
                            >
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className="select-item">
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}

                {/* Object Remove and Recolor */}
                {(type === 'remove' || type === "recolor") && (
                    <div className="prompt-field">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel={type === 'remove' ? "Remove Object" : "Recolor Object"}
                            render={({field})=>(
                                <Input value={field.value} className="input-field"
                                onChange={(e)=>onInputChangeHandler("prompt", e.target.value, type, field.onChange)}
                                />
                            )}
                        />
                        {type === 'recolor' && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel="Replacement Color"
                                render={({field})=>(
                                    <Input value={field.value} className="input-field"
                                    onChange={(e)=>onInputChangeHandler("color", e.target.value, type, field.onChange)}
                                    />
                                )}
                            />
                        )}
                    </div>
                )}
                <div className="media-uploader-field">
                <CustomField
                            control={form.control}
                            name="publicId"
                            className="flex size-full flex-col"
                            render={({field})=>(
                                <MediaUploader
                                onValueChange={field.onChange}
                                setImage={setImage}
                                publicId={field.value}
                                image={image}
                                type={type}
                                />
                            )}
                        />
                </div>
                <div className="flex flex-col gap-4">
                <Button type="button" className="submit-button capitalize" 
                disabled={isTransforming || newTransformation === null} onClick={onTransformHandler}>
                    {isTransforming ? "Transforming..." : "Apply Transform"}
                </Button>
                <Button type="submit" className="submit-button capitalize" 
                disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save Image"}
                </Button>
                </div>
            </form>
        </Form>
    )
}

export default TransformationForm