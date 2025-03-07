# Preval test case

# and_eq_coercion.md

> Bit hacks > And x if > And eq coercion
>
> Meh

## Input

`````js filename=intro
const x = $('32768');
const y = x & 32768; // (coercion)
const z = y === 32768 // true
$(z);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`32768`);
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = Boolean(y);
$(z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(`32768`) & 32768));
`````

## Pre Normal


`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "32768" );
const b = a & 32768;
const c = Boolean( b );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '32768'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
