# Preval test case

# missing_method.md

> Object literal > Static prop lookups > Missing method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  
};
$(o.toString());
`````


## Settled


`````js filename=intro
const o /*:object*/ = {};
const tmpCalleeParam /*:string*/ = o.toString();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({}.toString());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = a.toString();
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $object_toString


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
