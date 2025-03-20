# Preval test case

# if_side_effect2.md

> Let hoisting > Multi-scope-all-write > If side effect2
>
> A binding that is updated in a function called in one branch that is not actually visited should not be a problem.

## Input

`````js filename=intro
let f = function () {
  let x = 1;
  const g = function () {
    x = 2;
    return undefined;
  };
  if ($) {
    g();
  } else {
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
}
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
