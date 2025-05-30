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
