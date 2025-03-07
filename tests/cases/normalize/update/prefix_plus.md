# Preval test case

# prefix_plus.md

> Normalize > Update > Prefix plus
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = 1;
$(++x);
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(++x);
`````

## Normalized


`````js filename=intro
let x = 1;
x = x + 1;
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
