# Preval test case

# return_local_closure.md

> Function inlining > Return local closure
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function g() {
  let y = $(10);
  function f() {
    return y;
  }
  return f();
}
$(g());
`````

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    return y;
  };
  let y = $(10);
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const g = function () {
  const f = function () {
    return y;
  };
  const y = $(10);
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const tmpCalleeParam = g();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
