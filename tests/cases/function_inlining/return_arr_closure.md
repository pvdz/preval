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

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    const tmpReturnArg = [10, y, z];
    return tmpReturnArg;
  };
  const y = $(20);
  const z = $(30);
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const g = function () {
  const f = function () {
    const tmpReturnArg = [10, y, z];
    return tmpReturnArg;
  };
  const y = $(20);
  const z = $(30);
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
};
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
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

Normalized calls: Same

Final output calls: Same