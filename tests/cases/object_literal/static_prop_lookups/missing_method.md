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

## Pre Normal


`````js filename=intro
const o = {};
$(o.toString());
`````

## Normalized


`````js filename=intro
const o = {};
const tmpCalleeParam = o.toString();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = a.toString();
$( b );
`````

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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $object_toString
