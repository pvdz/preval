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
function g(x_1) {
  return x_1;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const x = tmpCallCallee(tmpCalleeParam);
export { x };
export { g };
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
export { x };
export { g };
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
