# Preval test case

# import_should_keep.md

> normalize > naming > import_should_keep
>
> The exported names are "observable" so their name should remain the same after the normalization step, at least.

## Input

`````js filename=intro
export function f() {
  // This x binding would cause the export to get a different 
  // unique name if we don't guard against that case
  let x = $(1);
  return x;
}
export function g(x) {
  return x;
}
export class c {}
export const x = $(f());
`````

## Normalized

`````js filename=intro
export function f() {
  let x_1 = $(1);
  return x_1;
}
export function g(x_2) {
  return x_2;
}
export class c {}
export const x = $(f());
`````

## Output

`````js filename=intro
export function f() {
  let x_1 = $(1);
  return x_1;
}
export function g(x_2) {
  return x_2;
}
export class c {}
export const x = $(f());
`````
