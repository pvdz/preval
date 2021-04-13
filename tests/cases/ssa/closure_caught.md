# Preval test case

# closure_caught.md

> Ssa > Closure caught
>
> Can SSA because while x is closed in h, we can determine that h does not "escape" and so there's no need to preserve access to x after g completes.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function() {
    x = $('first');
    let h = function() { $(x); }
    return h();
  };
  g();
  g();
  g();
  return g();
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function () {
    debugger;
    x = $('first');
    let h = function () {
      debugger;
      $(x);
    };
    return h();
  };
  g();
  g();
  g();
  return g();
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function () {
    debugger;
    x = $('first');
    let h = function () {
      debugger;
      $(x);
      return undefined;
    };
    const tmpReturnArg = h();
    return tmpReturnArg;
  };
  g();
  g();
  g();
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  let x = 0;
  const g = function () {
    debugger;
    x = $('first');
    $(x);
    return undefined;
  };
  g();
  g();
  g();
  g();
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'first'
 - 3: 'first'
 - 4: 'first'
 - 5: 'first'
 - 6: 'first'
 - 7: 'first'
 - 8: 'first'
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
