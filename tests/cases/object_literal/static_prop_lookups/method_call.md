# Preval test case

# method_call.md

> Object literal > Static prop lookups > Method call
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: function(){ return $(1); }};
$(o.x());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const o = { x: tmpObjLitVal };
const tmpMCF = o.x;
let tmpCalleeParam = $dotCall(tmpMCF, o, `x`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
