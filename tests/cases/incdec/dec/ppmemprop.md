# Preval test case

# ppmemprop.md

> Incdec > Dec > Ppmemprop
>
>

## Input

`````js filename=intro
let y = --$($spy(100)).x;
$(y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
$(tmpUpdInc);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($spy(100));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
$(tmpUpdInc);
`````

## Pre Normal


`````js filename=intro
let y = --$($spy(100)).x;
$(y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $spy(100);
let tmpUpdObj = $(tmpCalleeParam);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
let y = tmpUpdInc;
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = b.x;
const d = $coerce( c, "number" );
const e = d - 1;
b.x = e;
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
