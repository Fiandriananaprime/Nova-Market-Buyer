import { createElement } from 'react';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

// Local semantic primitives: this scaffold has no installed component design system.
export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return createElement('button', props);
};

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return createElement('input', props);
};

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => {
  return createElement('select', props);
};

export const Textarea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) => {
  return createElement('textarea', props);
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};
export const H1 = (props: HeadingProps) => {
  return createElement('h1', props);
};
export const H2 = (props: HeadingProps) => {
  return createElement('h2', props);
};
export const H3 = (props: HeadingProps) => {
  return createElement('h3', props);
};
export const H4 = (props: HeadingProps) => {
  return createElement('h4', props);
};
