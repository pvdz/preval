# Preval test case

# return_arr_closure.md

> Function inlining > Return arr closure
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function g() {
  const y = $(20);
  const z = $(30);
  function f() {
    return [10, y, z];
  }
  $(f());
}
$(g());
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return [10, y, z];
  };
  const y = $(20);
  const z = $(30);
  $(f());
};
$(g());
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = [10, y, z];
    return tmpReturnArg;
  };
  const y = $(20);
  const z = $(30);
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const y = $(20);
const z = $(30);
const tmpReturnArg = [10, y, z];
$(tmpReturnArg);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - 2: 30
 - 3: [10, 20, 30]
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
