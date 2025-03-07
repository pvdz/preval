# Preval test case

# two_add.md

> Constants > Two add
>
> Two constants, nothing happens

## Input

`````js filename=intro
const foo = "five";
const bar = "six";
$(bar + foo)
`````

## Settled


`````js filename=intro
$(`sixfive`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`sixfive`);
`````

## Pre Normal


`````js filename=intro
const foo = `five`;
const bar = `six`;
$(bar + foo);
`````

## Normalized


`````js filename=intro
const foo = `five`;
const bar = `six`;
const tmpCalleeParam = bar + foo;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "sixfive" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'sixfive'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
