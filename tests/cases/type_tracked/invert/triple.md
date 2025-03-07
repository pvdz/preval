# Preval test case

# triple.md

> Type tracked > Invert > Triple
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!!$(1));
`````

## Settled


`````js filename=intro
const tmpUnaryArg$3 /*:unknown*/ = $(1);
const tmpUnaryArg /*:boolean*/ = Boolean(tmpUnaryArg$3);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = Boolean($(1));
$(!tmpUnaryArg);
`````

## Pre Normal


`````js filename=intro
$(!!!$(1));
`````

## Normalized


`````js filename=intro
const tmpUnaryArg$3 = $(1);
const tmpUnaryArg$1 = !tmpUnaryArg$3;
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
const c = !b;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
