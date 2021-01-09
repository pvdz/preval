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

## Normalized

`````js filename=intro
export function g(x_1) {
  return x_1;
}
var tmpArg;
export const x = ((tmpArg = f()), $(tmpArg));
`````

## Uniformed

`````js filename=intro
export function x(x) {
  return x;
}
var x;
export var x = ((x = x()), x(x));
`````

## Output

`````js filename=intro
export function g(x_1) {
  return x_1;
}
var tmpArg;
export const x = ((tmpArg = f()), $(tmpArg));
`````
