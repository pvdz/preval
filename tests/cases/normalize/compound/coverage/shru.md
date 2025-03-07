# Preval test case

# shru.md

> Normalize > Compound > Coverage > Shru
>
> Compound assignments should destructure to regular assignments

## Input

`````js filename=intro
let a = 1, b = 2;
a >>>= b;
$(a);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2;
a >>>= b;
$(a);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
a = a >>> b;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
