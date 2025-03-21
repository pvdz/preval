# Preval test case

# number_neq_zero_one.md

> Typed comparison > Number neq zero one
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(0));
const y = x !== 1;
$('out:', y);
`````

## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(0);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(0), `string`);
$(`out:`, true);
`````

## Pre Normal


`````js filename=intro
const x = String($(0));
const y = x !== 1;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(0);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== 1;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
$coerce( a, "string" );
$( "out:", true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
