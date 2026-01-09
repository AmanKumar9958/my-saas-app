import React from 'react'
import ImageConverterContent from './content'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Image Converter",
};

export default function ImageConverterPage() {
    return <ImageConverterContent />;
}