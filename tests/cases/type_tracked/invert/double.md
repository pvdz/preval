# Preval test case

# double.md

> Type tracked > Invert > Double
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!$(1));
`````

## Settled


`````js filename=intro
const tmpUnaryArg$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:boolean*/ = Boolean(tmpUnaryArg$1);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(1)));
`````

## Pre Normal


`````js filename=intro
$(!!$(1));
`````

## Normalized


`````js filename=intro
const tmpUnaryArg$1 = $(1);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
