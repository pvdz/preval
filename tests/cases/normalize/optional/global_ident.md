# Preval test case

# global_ident.md

> Normalize > Optional > Global ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(global?.foo);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = global == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = global.foo;
  $(tmpChainElementObject);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (global == null) {
  $(undefined);
} else {
  $(global.foo);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = global == null;
if (a) {
  $( undefined );
}
else {
  const b = global.foo;
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = global;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
  $(tmpChainElementObject);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
