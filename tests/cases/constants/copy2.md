# Preval test case

# copy2.md

> Constants > Copy2
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
const wow = bar;
$(wow)
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
const bar = foo;
const wow = bar;
$(wow);
`````

## Normalized


`````js filename=intro
const foo = `five`;
const bar = foo;
const wow = bar;
$(wow);
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
