# Preval test case

# number_eq_string.md

> Typed comparison > Number eq string
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Number($(100));
const y = x === "";
$('out:', y);
`````

## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(100);
$coerce(tmpStringFirstArg, `number`);
$(`out:`, false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(100), `number`);
$(`out:`, false);
`````

## Pre Normal


`````js filename=intro
const x = Number($(100));
const y = x === ``;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(100);
const x = $coerce(tmpStringFirstArg, `number`);
const y = x === ``;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$coerce( a, "number" );
$( "out:", false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
