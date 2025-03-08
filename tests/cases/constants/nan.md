# Preval test case

# nan.md

> Constants > Nan
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar)
`````

## Settled


`````js filename=intro
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````

## Pre Normal


`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar);
`````

## Normalized


`````js filename=intro
const foo = NaN;
const bar = foo;
$(foo);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
