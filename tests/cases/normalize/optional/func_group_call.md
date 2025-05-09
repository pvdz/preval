# Preval test case

# func_group_call.md

> Normalize > Optional > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.()
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpChainRootCall /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = tmpChainRootCall == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const y /*:unknown*/ = tmpChainRootCall();
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(y);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootCall = $();
if (tmpChainRootCall == null) {
  $($(undefined));
} else {
  $($(tmpChainRootCall()));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  const c = $( undefined );
  $( c );
}
else {
  const d = a();
  const e = $( d );
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
