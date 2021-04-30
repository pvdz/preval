# Preval test case

# decl_recursive_second_attempt_multi_call.md

> Ssa > Decl recursive second attempt multi call
>
> A recursive function that is then replaced with another value (why would you do this, I dunno)

#TODO

## Input

`````js filename=intro
const T = $(true);
const F = $(false);
function f() {
  let g = function (x) {
    if (x) {
      g(F);
      $(100);
    }
    return function(){ $('new'); }
  };
  // The idea is that if `g` above is SSA'd then the name would change. But if the name changes then
  // the reference is no longer accessible.
  g = g(T);
  g(); // "new"
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let x = $$0;
    debugger;
    if (x) {
      g(F);
      $(100);
    }
    return function () {
      debugger;
      $('new');
    };
  };
  g = g(T);
  g();
};
const T = $(true);
const F = $(false);
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let x = $$0;
    debugger;
    if (x) {
      g(F);
      $(100);
    } else {
    }
    const tmpReturnArg = function () {
      debugger;
      $('new');
      return undefined;
    };
    return tmpReturnArg;
  };
  g = g(T);
  g();
  return undefined;
};
const T = $(true);
const F = $(false);
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const tmpReturnArg = function () {
  debugger;
  $('new');
  return undefined;
};
const T = $(true);
const F = $(false);
if ($) {
  let g = function ($$0) {
    const x = $$0;
    debugger;
    if (x) {
      g(F);
      $(100);
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  };
  g = g(T);
  g();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 100
 - 4: 'new'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
