# Preval test case

# member.md

> Normalize > Unary > Inv > Member
>
> Inverting a member expression is two things

## Input

`````js filename=intro
$(!Date.length);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:number*/ = Date.length;
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = Date.length;
$(!tmpUnaryArg);
`````

## Pre Normal


`````js filename=intro
$(!Date.length);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = Date.length;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = Date.length;
const b = !a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
