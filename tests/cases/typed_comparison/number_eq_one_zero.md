# Preval test case

# number_eq_one_zero.md

> Typed comparison > Number eq one zero
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(1));
const y = x === 0;
$('out:', y);
`````

## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(1);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(1), `string`);
$(`out:`, false);
`````

## Pre Normal


`````js filename=intro
const x = String($(1));
const y = x === 0;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(1);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === 0;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
$( "out:", false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
