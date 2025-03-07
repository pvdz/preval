# Preval test case

# one.md

> Constants > One
>
> Single constant, nothing happens

## Input

`````js filename=intro
const foo = "five";
$(foo)
`````

## Settled


`````js filename=intro
$(`five`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`five`);
`````

## Pre Normal


`````js filename=intro
const foo = `five`;
$(foo);
`````

## Normalized


`````js filename=intro
const foo = `five`;
$(foo);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "five" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'five'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
