# Preval test case

# func_method_not_a_func.md

> Object literal > Static prop lookups > Func method not a func
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const arr = [1, 2, 3];
const o = {
  arr,
};
// Should leave it (for now). Although we kinda know this will be a runtime error, anyways.
$(o.arr());
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
const o /*:object*/ = { arr: arr };
const tmpCalleeParam /*:unknown*/ = o.arr();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
$({ arr: arr }.arr());
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
const o = { arr: arr };
$(o.arr());
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const o = { arr: arr };
const tmpCalleeParam = o.arr();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = { arr: a };
const c = b.arr();
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
