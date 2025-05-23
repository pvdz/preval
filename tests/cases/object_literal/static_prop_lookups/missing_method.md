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
const tmpCalleeParam /*:string*/ = $dotCall($object_toString, o, `toString`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($object_toString, {}, `toString`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $dotCall( $object_toString, a, "toString" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const o = {};
const tmpMCF = o.toString;
let tmpCalleeParam = $dotCall(tmpMCF, o, `toString`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $object_toString


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
