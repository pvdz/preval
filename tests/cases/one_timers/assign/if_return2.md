# Preval test case

# if_return2.md

> One timers > Assign > If return2
>
> Return inlining

## Input

`````js filename=intro
const closure = function () {
  return $(x, 'closure');
};
const f = function () {
  if ($) {
    $(1, 'f');
  }
};
let x = $(100, 'init');
closure();
x = f();
$(x, 'x');
closure();
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100, `init`);
$(x, `closure`);
if ($) {
  $(1, `f`);
  $(undefined, `x`);
  $(undefined, `closure`);
} else {
  $(undefined, `x`);
  $(undefined, `closure`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100, `init`), `closure`);
if ($) {
  $(1, `f`);
  $(undefined, `x`);
  $(undefined, `closure`);
} else {
  $(undefined, `x`);
  $(undefined, `closure`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100, "init" );
$( a, "closure" );
if ($) {
  $( 1, "f" );
  $( undefined, "x" );
  $( undefined, "closure" );
}
else {
  $( undefined, "x" );
  $( undefined, "closure" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const closure = function () {
  debugger;
  const tmpReturnArg = $(x, `closure`);
  return tmpReturnArg;
};
const f = function () {
  debugger;
  if ($) {
    $(1, `f`);
    return undefined;
  } else {
    return undefined;
  }
};
let x = $(100, `init`);
closure();
x = f();
$(x, `x`);
closure();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100, 'init'
 - 2: 100, 'closure'
 - 3: 1, 'f'
 - 4: undefined, 'x'
 - 5: undefined, 'closure'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
