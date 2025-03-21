# Preval test case

# tdz_closure_problem.md

> Function promo > Tdz closure problem
>
> If a binding occurred after the reference the algorithm should not assume that the closure was referenced

This kind of problem should have been skirted by having unique names in the first place...

## Input

`````js filename=intro
function f() {
  let x = $('outer');
  function g() {
    // This function should be hoistable to global because x is not a closure
    $(x); // This read triggers TDZ at runtime
    let x = $('inner');
    if ($) $('prevent premature elimination');
  }
  
  g();
  if ($) $('prevent premature elimination');
}
if ($) f();
`````

## Settled


`````js filename=intro
if ($) {
  $(`outer`);
  throw `Preval: TDZ triggered for this read: \$(x\$1)`;
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`outer`);
  throw `Preval: TDZ triggered for this read: \$(x\$1)`;
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $($throwTDZError(`Preval: TDZ triggered for this read: \$(x\$1)`));
    let x$1 = $(`inner`);
    if ($) $(`prevent premature elimination`);
  };
  let x = $(`outer`);
  g();
  if ($) $(`prevent premature elimination`);
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    throw `Preval: TDZ triggered for this read: \$(x\$1)`;
    let x$1 = 0;
    return undefined;
  };
  let x = $(`outer`);
  g();
  if ($) {
    $(`prevent premature elimination`);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "outer" );
  throw "Preval: TDZ triggered for this read: $(x$1)";
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'outer'
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
