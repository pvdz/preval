# Preval test case

# obj_method_normalize.md

> Ai > Ai5 > Obj method normalize
>
> Test normalization of Object methods to direct operations

## Input

`````js filename=intro
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj);
$(keys);

// Expected:
// const obj = { a: 1, b: 2 };
// const keys = ["a", "b"];
// $(keys);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const keys /*:array*/ /*truthy*/ = $Object_keys(obj);
$(keys);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_keys({ a: 1, b: 2 }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $Object_keys( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const tmpMCF = $Object_keys;
const keys = $Object_keys(obj);
$(keys);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_keys


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
