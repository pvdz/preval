# Preval test case

# return_lit.md

> Function inlining > Return lit
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
