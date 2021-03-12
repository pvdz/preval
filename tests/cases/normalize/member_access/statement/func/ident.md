# Preval test case

# ident.md

> Normalize > Member access > Statement > Func > Ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  $.length;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  $.length;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $.length;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $.length;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
