"use client";

import React, { forwardRef } from "react";
import dynamic from "next/dynamic";

// Dynamic import of JoditEditor with `ssr: false`
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const JoditEditorWrapper = forwardRef((props: any, ref: React.Ref<any>) => {
  return <JoditEditor {...props} innerRef={ref} />;
});

JoditEditorWrapper.displayName = "JoditEditorWrapper";

export default JoditEditorWrapper;
