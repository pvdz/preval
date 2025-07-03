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
const ARR /*:array*/ /*truthy*/ = [`b`, `c`, `a`];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const tmpMCF = ARR.shift;
const item = $dotCall(tmpMCF, ARR, `shift`);
const tmpMCF$1 = ARR.push;
$dotCall(tmpMCF$1, ARR, `push`, item);
$(NOOP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement


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
