# Preval test case

# closure_caught.md

> Ssa > Closure caught
>
> Can SSA because while x is closed in h, we can determine that h does not "escape" and so there's no need to preserve access to x after g completes.

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

## Settled


`````js filename=intro
if ($) {
  const g /*:()=>undefined*/ = function () {
    debugger;
    const tmpssa2_x /*:unknown*/ = $(`first`);
    $(tmpssa2_x);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const g = function () {
    $($(`first`));
  };
  g();
  g();
  g();
  g();
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function () {
    debugger;
    x = $(`first`);
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
    x = $(`first`);
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
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    const b = $( "first" );
    $( b );
    return undefined;
  };
  a();
  a();
  a();
  a();
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same
