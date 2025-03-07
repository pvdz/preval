# Preval test case

# string_neq_empty_empty.md

> Typed comparison > String neq empty empty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(''));
const y = x !== '';
$('out:', y);
`````

## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(``);
const x /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const y /*:boolean*/ = Boolean(x);
$(`out:`, y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, Boolean($coerce($(``), `string`)));
`````

## Pre Normal


`````js filename=intro
const x = String($(``));
const y = x !== ``;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(``);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== ``;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = Boolean( b );
$( "out:", c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
