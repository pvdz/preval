# Preval test case

# import_should_keep.md

> Normalize > Naming > Import should keep
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
let f = function () {
  let x$1 = $(1);
  return x$1;
};
let g = function (x$2) {
  return x$2;
};
let c = class {};
export { c };
const tmpCallCallee = $;
const tmpCalleeParam = f();
const x = tmpCallCallee(tmpCalleeParam);
export { x };
export { f };
export { g };
`````

## Output

`````js filename=intro
const f = function () {
  const x$1 = $(1);
  return x$1;
};
const g = function (x$2) {
  return x$2;
};
const c = class {};
export { c };
const tmpCalleeParam = $(1);
const x = $(tmpCalleeParam);
export { x };
export { f };
export { g };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
