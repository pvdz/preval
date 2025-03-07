# Preval test case

# inline_obj_spread2.md

> Tofix > inline obj spread2
>
> Spread arg that is simple should not change

The first object literal should be spread into the second object literal when we have full visibility

## Input

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const tmpCalleeParam = { ...tmpObjLitVal }; // Should preval realize that this is redundant, knowing that the arg is a fresh object already?
$(tmpCalleeParam);
`````

## PST Output:

With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## PST Output:

With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
$({ ...tmpObjLitVal });
`````

## Pre Normal


`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const tmpCalleeParam = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const tmpCalleeParam = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { bar: 10 };
const tmpCalleeParam /*:object*/ = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { bar: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
