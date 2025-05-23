# Preval test case

# if_side_effect.md

> Let hoisting > Multi-scope-all-write > If side effect
>
> A binding that is updated in a function called in one branch that is not actually visited should not be a problem.

## Input

`````js filename=intro
function f() {
  let x = 1;
  const g = function() {
    x = 2;
  };
  if ($) {
    g();
  }
  $(x);
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  $(2);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  if ($) {
    g();
    $(x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
