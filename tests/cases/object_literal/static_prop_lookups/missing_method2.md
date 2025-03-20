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

## Pre Normal


`````js filename=intro
const o = {
  toString() {
    debugger;
    return `xyz`;
  },
};
$(o.toString());
`````

## Normalized


`````js filename=intro
const o = {
  toString() {
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
const a = { toString(  ) {
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
 - 1: 'xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $object_toString
