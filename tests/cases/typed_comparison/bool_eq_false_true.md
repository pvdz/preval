# Preval test case

# bool_eq_false_true.md

> Typed comparison > Bool eq false true
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = Boolean($(false));
const y = x === true;
$('out:', y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(false);
const x /*:boolean*/ = Boolean(tmpCalleeParam);
$(`out:`, x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, Boolean($(false)));
`````

## Pre Normal


`````js filename=intro
const x = Boolean($(false));
const y = x === true;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(false);
const x = Boolean(tmpCalleeParam);
const y = x === true;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = Boolean( a );
$( "out:", b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
