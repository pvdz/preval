# Preval test case

# two.md

> Constants > Two
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar)
`````

## Settled


`````js filename=intro
$(`six`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`six`);
`````

## Pre Normal


`````js filename=intro
const foo = `five`;
const bar = `six`;
$(bar);
`````

## Normalized


`````js filename=intro
const foo = `five`;
const bar = `six`;
$(bar);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "six" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'six'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
