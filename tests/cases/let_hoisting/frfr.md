# Preval test case

# frfr.md

> Let hoisting > Frfr
>
> console.log can be considered side effect free

## Input

`````js filename=intro
const freeFunc1 = function $free(x, y) {
  return y * (x + 287);
};
let f = function() {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
$frfr(freeFunc1, 1, 2);
let x = $(2);
f();
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x, `f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2), `f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "f" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const freeFunc1 = function $free($$0, $$1) {
  let x$1 = $$0;
  let y = $$1;
  debugger;
  const tmpBinBothLhs = y;
  const tmpBinBothRhs = x$1 + 287;
  const tmpReturnArg = tmpBinBothLhs * tmpBinBothRhs;
  return tmpReturnArg;
};
let f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
$(1);
$frfr(freeFunc1, 1, 2);
let x = $(2);
f();
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
