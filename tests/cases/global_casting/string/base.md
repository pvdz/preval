# Preval test case

# base.md

> Global casting > String > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = '' + a;
const y = String(x);
$(y);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const x /*:string*/ = $coerce(a, `plustr`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(`a`), `plustr`));
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
const tmpStringFirstArg = x;
const y = $coerce(x, `string`);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "plustr" );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
