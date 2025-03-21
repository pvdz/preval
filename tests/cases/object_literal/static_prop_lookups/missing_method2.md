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
const tmpCalleeParam /*:string*/ = o.toString();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  {
    toString() {
      return `xyz`;
    },
  }.toString(),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { toString(  ) {
  debugger;
  return "xyz";
} };
const b = a.toString();
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $object_toString


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
