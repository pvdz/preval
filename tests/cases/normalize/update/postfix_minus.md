# Preval test case

# postfix_minus.md

> Normalize > Update > Postfix minus
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = 1;
$(x--);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(x--);
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent - 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
