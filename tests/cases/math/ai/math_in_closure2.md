# Preval test case

# math_in_closure2.md

> Math > Ai > Math in closure2
>
> Math in closure, capturing variable

## Input

`````js filename=intro
const tmpFree /*:(number, number)=>number*/ = function $free(x, y) {
  const xy /*:number*/ = x * y;
  const z /*:number*/ = $Math_round(xy);
  const tmpRet /*:number*/ = z / y;
  return tmpRet;
};
const n /*:number*/ /*truthy*/ = 100;
const f /*:(number)=>number*/ = function(a) {
  let tmpReturnArg$1 /*:number*/ = $frfr(tmpFree, a, n);
  return tmpReturnArg$1;
};
const tmp /*:number*/ = f(1.2345);
const a /*:unknown*/ = $(tmp);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.23);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1.23));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.23 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const xy = x * y;
  const z = $Math_round(xy);
  const tmpRet = z / y;
  return tmpRet;
};
const n = 100;
const f = function ($$0) {
  let a$1 = $$0;
  debugger;
  let tmpReturnArg$1 = $frfr(tmpFree, a$1, n);
  return tmpReturnArg$1;
};
const tmp = f(1.2345);
const a = $(tmp);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.23
 - 2: 1.23
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
