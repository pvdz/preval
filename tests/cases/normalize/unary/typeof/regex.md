# Preval test case

# regex.md

> Normalize > Unary > Typeof > Regex
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof /foo/);
`````

## Settled


`````js filename=intro
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````

## Pre Normal


`````js filename=intro
$(typeof /foo/);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = /foo/;
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
