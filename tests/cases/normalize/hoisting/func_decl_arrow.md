# Preval test case

# func_decl_arrow.md

> Normalize > Hoisting > Func decl arrow
>
> Function declaration in toplevel

#TODO

## Input

`````js filename=intro
const g = () => {
  $(1);
  function f() {}
  $(f());
}
g();
`````

## Normalized

`````js filename=intro
const g = () => {
  let f$2 = function () {};
  $(1);
  const tmpCallCallee = $;
  const tmpCalleeParam = f$2();
  tmpCallCallee(tmpCalleeParam);
};
g();
`````

## Output

`````js filename=intro
const g = () => {
  $(1);
  $(undefined);
};
g();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
