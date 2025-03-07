# Preval test case

# regex.md

> Tilde > Regex
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~/1/);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:regex*/ = /1/;
const tmpCalleeParam /*:number*/ = ~tmpUnaryArg;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = /1/;
$(~tmpUnaryArg);
`````

## Pre Normal


`````js filename=intro
$(~/1/);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = /1/;
const tmpCalleeParam = ~tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /1/;
const b = ~a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
