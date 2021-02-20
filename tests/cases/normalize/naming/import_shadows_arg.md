# Preval test case

# import_shadows_arg.md

> Normalize > Naming > Import shadows arg
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
function g(x$1) {
  return x$1;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const x = tmpCallCallee(tmpCalleeParam);
export { x };
export { g };
`````

## Output

`````js filename=intro
function g(x$1) {
  return x$1;
}
const tmpCalleeParam = f();
const x = $(tmpCalleeParam);
export { x };
export { g };
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
