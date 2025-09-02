"use client";
import React, { useEffect, useState } from "react";
import { SingleLineLoading } from "@/components/common";

export default function PdfLoader({ pdfUrl }: { pdfUrl: string }) {
  const [pdfSrc, setPdfSrc] = useState<string>("");

  useEffect(() => {
    const fetchPdf = async () => {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfSrc(url);
    };

    fetchPdf();
  }, [pdfUrl]);

  return pdfSrc ? (
    <iframe
      src={pdfSrc}
      className="w-full h-full min-h-[80vh] rounded-md"
      title="PDF Viewer"
      allow="fullscreen"
    />
  ) : (
    <SingleLineLoading />
  );
}
