# Preval test case

# global_group_call.md

> Normalize > Optional > Global group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())?.foo
$(y);
`````


## Settled


`````js filename=intro
const tmpChainRootProp /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.foo;
  $(tmpChainElementObject);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $();
if (tmpChainRootProp == null) {
  $(undefined);
} else {
  $(tmpChainRootProp.foo);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.foo;
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
