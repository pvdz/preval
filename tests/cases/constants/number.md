# Preval test case

# number.md

> Constants > Number
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = 5;
const bar = foo;
$(bar)
`````

## Settled


`````js filename=intro
$(5);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````

## Pre Normal


`````js filename=intro
const foo = 5;
const bar = foo;
$(bar);
`````

## Normalized


`````js filename=intro
const foo = 5;
const bar = foo;
$(foo);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
