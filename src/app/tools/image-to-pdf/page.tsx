import { Metadata } from 'next';
import React from 'react'
import ImageToPdfContent from './content';

export const metadata: Metadata = {
    title: "Image to PDF",
};

const ImageToPdfPage = () => {
    return (
        <ImageToPdfContent />
    )
}

export default ImageToPdfPage