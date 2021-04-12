# Preval test case

# closure_shadowing.md

> Ssa > Closure shadowing
>
> We could SSA a binding in a closure if the first ref is a write, not in a loop, and all subsequent refs can reach the first write.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 10;
  const g = function(){ 
    x = 20;
    $(x);
  };
  x = 30;
  if ($) return g();
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 10;
  const g = function () {
    debugger;
    x = 20;
    $(x);
  };
  x = 30;
  if ($) return g();
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 10;
  const g = function () {
    debugger;
    x = 20;
    $(x);
  };
  x = 30;
  if ($) {
    const tmpReturnArg = g();
    return tmpReturnArg;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    $(20);
    return undefined;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
