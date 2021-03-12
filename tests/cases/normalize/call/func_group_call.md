# Preval test case

# func_group_call.md

> Normalize > Call > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $(parseInt))()
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const y = (1, 2, $(parseInt))();
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $(parseInt);
  const y = tmpCallCallee();
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCallCallee = $(parseInt);
  const y = tmpCallCallee();
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
