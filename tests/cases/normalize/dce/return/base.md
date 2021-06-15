# Preval test case

# base.md

> Normalize > Dce > Return > Base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  return $(5, 'ret');
  $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(5, `ret`);
  $(`fail`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $(5, `ret`);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(5, `ret`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 'ret'
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
