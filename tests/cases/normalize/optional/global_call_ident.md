# Preval test case

# global_call_ident.md

> Normalize > Optional > Global call ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$?.(15);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  $(15);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!($ == null)) {
  $(15);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {

}
else {
  $( 15 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(15);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
