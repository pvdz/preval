# Preval test case

# write_read_before_func.md

> Ssa > Multi scope > Write read before func
>
> A binding that is always written before read is a prime target for SSA

In this case there is a func definition between the let and its first usage. It was blocking the SSA promotion.

## Input

`````js filename=intro
const x = $('a');
let y = x === 'undefined';
const g = function () {
  debugger;
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  y = tmpAssignRhsProp$105._isMockFunction;
  if (y) {
    $(1);
  } else {
    $(2);
  }
};
if (y) {
  g();
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
const y /*:boolean*/ = x === `undefined`;
if (y) {
  const tmpAssignRhsProp$105 /*:unknown*/ = tmpthis$63.getInitialState;
  const tmpClusterSSA_y /*:unknown*/ = tmpAssignRhsProp$105._isMockFunction;
  if (tmpClusterSSA_y) {
    $(1);
  } else {
    $(2);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`a`) === `undefined`) {
  if (tmpthis$63.getInitialState._isMockFunction) {
    $(1);
  } else {
    $(2);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = a === "undefined";
if (b) {
  const c = tmpthis$63.getInitialState;
  const d = c._isMockFunction;
  if (d) {
    $( 1 );
  }
  else {
    $( 2 );
  }
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

tmpthis$63


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
