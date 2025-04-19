# Preval test case

# simple_rotate.md

> Array > Manipulation > Simple rotate
>
> Array literal with shift and a const function binding in between

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const item = ARR.shift();
ARR.push(item);
$(NOOP);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [`b`, `c`, `a`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`b`, `c`, `a`];
$(function () {
  $(ARR);
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", "c", "a" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( b );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) outline any args for tdz
- (todo) arr mutation may be able to inline this method: tmpMCF$1


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
