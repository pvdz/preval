# Preval test case

# closure_inner_read.md

> Ssa > Closure inner read
>
> Can not SSA because there is a read inside an inner function that should reflect the state of x after the _last_ call to g(), even after any call of g() finishes

#TODO

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function() {
    x = $(x + 1);
    const h = function() { $(x); }
    if ($) {
      return h();
    }
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
    x = $(x + 1);
    const h = function () {
      debugger;
      $(x);
    };
    if ($) {
      return h();
    }
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
    const tmpCallCallee = $;
    const tmpCalleeParam = x + 1;
    x = tmpCallCallee(tmpCalleeParam);
    const h = function () {
      debugger;
      $(x);
      return undefined;
    };
    if ($) {
      const tmpReturnArg = h();
      return tmpReturnArg;
    } else {
      return undefined;
    }
  };
  g();
  g();
  g();
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  let x = 0;
  const g = function () {
    debugger;
    const tmpCalleeParam = x + 1;
    x = $(tmpCalleeParam);
    if ($) {
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
  g();
  g();
  g();
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = 0;
  const b = function() {
    debugger;
    const c = a + 1;
    a = $( c );
    if ($) {
      $( a );
      return undefined;
    }
    else {
      return undefined;
    }
  };
  b();
  b();
  b();
  b();
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: 4
 - 8: 4
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
