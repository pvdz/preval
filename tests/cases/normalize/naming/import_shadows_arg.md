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

## Output

`````js filename=intro
export function g(x_1) {
  return x_1;
}
var tmpArg;
export const x = ((tmpArg = f()), $(tmpArg));
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
