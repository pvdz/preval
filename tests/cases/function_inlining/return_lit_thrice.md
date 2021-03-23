# Preval test case

# return_lit_thrice.md

> Function inlining > Return lit thrice
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
$(f());
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
$(f());
$(f());
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
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
$(10);
$(10);
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
