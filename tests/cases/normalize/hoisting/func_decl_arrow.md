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
  function f$2() {}
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
  function f$3() {}
  $(1);
  const tmpCalleeParam = f$3();
  $(tmpCalleeParam);
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
