# Preval test case

# import_should_keep.md

> normalize > naming > import_should_keep
>
> The name of an arg that appears earlier in a file appeared to shadow the name of an exported global.

## Input

`````js filename=intro
export function g(x) {
  return x;
}
export const x = $(f());
`````

## Output

`````js filename=intro
export function g(x_1) {
  return x_1;
}
export const x = $(f());
`````
