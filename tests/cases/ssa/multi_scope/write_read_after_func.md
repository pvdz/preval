# Preval test case

# write_read_after_func.md

> Ssa > Multi scope > Write read after func
>
> A binding that is always written before read is a prime target for SSA

In this case the let occurs after a func, immediately next to the usage

## Input

`````js filename=intro
const x = $('a');
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
let y = x === 'undefined';
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
  const tmpssa2_y /*:unknown*/ = tmpAssignRhsProp$105._isMockFunction;
  if (tmpssa2_y) {
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

## Pre Normal


`````js filename=intro
const x = $(`a`);
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
let y = x === `undefined`;
if (y) {
  g();
}
`````

## Normalized


`````js filename=intro
const x = $(`a`);
const g = function () {
  debugger;
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  y = tmpAssignRhsProp$105._isMockFunction;
  if (y) {
    $(1);
    return undefined;
  } else {
    $(2);
    return undefined;
  }
};
let y = x === `undefined`;
if (y) {
  g();
} else {
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
