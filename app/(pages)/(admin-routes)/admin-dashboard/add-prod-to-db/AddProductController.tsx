
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    CreateProductDBData,
    CreateProductFormData,
    createProductFormSchema,
} from "@/app/schemas/schemas";

import { AddProductView } from "./AddProductView";

export const AddProductController = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductFormSchema),
    });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const addProduct = async (data: CreateProductFormData) => {
        if (selectedImages.length === 0) {
            alert("Debe seleccionar al menos una imagen");
            return;
        }

        // Crear el campo de group
        let group = "";
        if (data.title.toLowerCase().includes(data.color.toLowerCase())) {
            group = data.title.replace(data.color, "").trim();
        } else {
            group = data.title
        }

        // Procesar imagenes y conseguir sus URLs
        const imageUrls: string[] = [];
        for (const image of selectedImages) {
            const imageUrl = await uploadImage(image, data.category.toLowerCase());
            if (imageUrl) {
                imageUrls.push(imageUrl);
            }
        }

        // Crear el producto en la base de datos y subirlo
        const newProduct: CreateProductDBData = {
            title: data.title,
            description: data.description,
            sugestedPrice: data.sugestedPrice,
            listPrice: data.listPrice,
            brand: data.brand,
            listCode: data.listCode,
            color: data.color,
            stock: data.stock,
            category: data.category,
            group: group,
            img: imageUrls,
            subcategory: data.subcategory,
        }

        const { error: productError } = await supabase
            .from("products")
            .insert(newProduct)

        if (productError) {
            console.error("Error creating product:", productError);
            return;
        }

        alert("Producto creado correctamente")

        reset();
        setSelectedImages([]);
        setImagePreviews([]);
        setSelectedCategory("");
    };

    const uploadImage = async (image: File, folder: string) => {
        const fileExtension = image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabase.storage
            .from("Images")
            .upload(filePath, image);

        if (error) {
            alert(`Error uploading image: ${error.message}`);
            return null;
        }

        const { data: signedUrlData, error: urlError } = await supabase.storage
            .from("Images")
            .createSignedUrl(filePath, 157788000);

        if (urlError) {
            console.error("Error creating signed URL:", urlError);
            alert(`Error generando URL: ${urlError.message}`);
            return null;
        }

        console.log("Signed URL (5 years):", signedUrlData.signedUrl);

        return signedUrlData.signedUrl;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (selectedImages.length + files.length > 5) {
            alert(
                `Máximo 5 imágenes permitidas. Actualmente tienes ${selectedImages.length} imágenes.`
            );
            return;
        }

        const newImages = [...selectedImages, ...files];
        setSelectedImages(newImages);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);

        setSelectedImages(newImages);
        setImagePreviews(newPreviews);
    };

    return (
        <AddProductView
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            control={control}
            isSubmitting={isSubmitting}
            addProduct={addProduct}
            setSelectedCategory={setSelectedCategory}
            imagePreviews={imagePreviews}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
            selectedCategory={selectedCategory}
        />  
    )
}