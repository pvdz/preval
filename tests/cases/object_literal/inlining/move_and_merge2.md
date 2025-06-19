# Preval test case

# move_and_merge2.md

> Object literal > Inlining > Move and merge2
>
> Move and merge when we can

## Input

`````js filename=intro
const f$1 /*:(unknown)=>unknown*/ = function($$0) {
  const a /*:unknown*/ = $$0;
  debugger;
  $(`inner func`, a);
  return a;
};
f$1;
({ f: f$1 });
const tmp /*:unknown*/ = f$1();
$(tmp);
`````


## Settled


`````js filename=intro
$(`inner func`, undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inner func`, undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inner func", undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f$1 = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const a = $dlr_$$0;
  $(`inner func`, $dlr_$$0);
  return a;
};
const tmp = f$1();
$(tmp);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner func', undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
