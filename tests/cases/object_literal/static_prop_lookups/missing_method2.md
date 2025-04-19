# Preval test case

# missing_method2.md

> Object literal > Static prop lookups > Missing method2
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  toString(){ return 'xyz'; },
};
$(o.toString());
`````


## Settled


`````js filename=intro
const o /*:object*/ = {
  toString() {
    debugger;
    return `xyz`;
  },
};
const tmpCallCompVal /*:unknown*/ = o.toString;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, o, `toString`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const o = {
  toString() {
    return `xyz`;
  },
};
$(o.toString());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { toString(  ) {
  debugger;
  return "xyz";
} };
const b = a.toString;
const c = $dotCall( b, a, "toString" );
$( c );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_toString


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
