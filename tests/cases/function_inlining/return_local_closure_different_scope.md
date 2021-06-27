# Preval test case

# return_local_closure_different_scope.md

> Function inlining > Return local closure different scope
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
  return f;
}
// The second call invokes f but it can't be 
// inlined because global has no access to y
$(g()());
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return y;
  };
  let y = $(10);
  return f;
};
$(g()());
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return y;
  };
  let y = $(10);
  return f;
};
const tmpCallCallee = $;
const tmpCallComplexCallee = g();
const tmpCalleeParam = tmpCallComplexCallee();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const y = $(10);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
