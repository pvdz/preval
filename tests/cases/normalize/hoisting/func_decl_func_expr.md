# Preval test case

# func_decl_func_expr.md

> Normalize > Hoisting > Func decl func expr
>
> Function declaration in toplevel

#TODO

## Input

`````js filename=intro
const g = function() {
  $(1);
  function f() {}
  $(f());
}
g();
`````

## Pre Normal

`````js filename=intro
const g = function () {
  let f = function () {};
  $(1);
  $(f());
};
g();
`````

## Normalized

`````js filename=intro
const g = function () {
  let f = function () {};
  $(1);
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
};
g();
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
