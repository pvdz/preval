# Preval test case

# missing_method3.md

> Object literal > Static prop lookups > Missing method3
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  valueOf(){ return 'xyz'; },
};
$(o.toString());
`````

## Settled


`````js filename=intro
const o /*:object*/ = {
  valueOf() {
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
    valueOf() {
      return `xyz`;
    },
  }.toString(),
);
`````

## Pre Normal


`````js filename=intro
const o = {
  valueOf() {
    debugger;
    return `xyz`;
  },
};
$(o.toString());
`````

## Normalized


`````js filename=intro
const o = {
  valueOf() {
    debugger;
    return `xyz`;
  },
};
const tmpCalleeParam = o.toString();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { valueOf(  ) {
  debugger;
  return "xyz";
} };
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
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $object_toString
