# Preval test case

# func_global_top.md

> Normalize > Hoisting > Base > Func global top
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
$(f());
function f() {
  return 100;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return 100;
};
$(f());
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return 100;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
$(100);
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
