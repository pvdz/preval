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

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    return y;
  };
  let y = $(10);
  return f;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = g();
const tmpCalleeParam = tmpCallCallee$1();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const g = function () {
  const f = function () {
    return y;
  };
  const y = $(10);
  return f;
};
const tmpCallCallee$1 = g();
const tmpCalleeParam = tmpCallCallee$1();
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
