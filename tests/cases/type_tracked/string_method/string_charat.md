# Preval test case

# string_charat.md

> Type tracked > String method > String charat
>
> String charAt should fully resolve

## Input

`````js filename=intro
$('hello'.charAt(2));
`````

## Settled


`````js filename=intro
$(`l`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`l`);
`````

## Pre Normal


`````js filename=intro
$(`hello`.charAt(2));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.charAt(2);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "l" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'l'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
