# Preval test case

# base.md

> Global casting > Number > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = +a;
const y = Number(x);
$(y);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const x /*:number*/ = +a;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`);
$(+a);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const x = +a;
const y = Number(x);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const x = +a;
const tmpStringFirstArg = x;
const y = $coerce(tmpStringFirstArg, `number`);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = +a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
