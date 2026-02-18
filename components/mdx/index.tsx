import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900" {...props} />
  ),
  h2: (props) => (
    <h2 className="mb-4 mt-8 text-2xl font-semibold text-zinc-800" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-7 text-zinc-600" {...props} />
  ),
  a: (props) => (
    <a className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600" {...props} />
  ),
  img: (props) => (
    <Image
      className="my-6 rounded-lg"
      src={props.src || ""}
      alt={props.alt || ""}
      width={800}
      height={500}
      style={{ width: "100%", height: "auto" }}
    />
  ),
};
