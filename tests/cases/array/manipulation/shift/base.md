# Preval test case

# base.md

> Array > Manipulation > Shift > Base
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [...$([ `a`, `b`, `c` ])];
const N = ARR.shift();
$(N);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`a`, `b`, `c`];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const ARR /*:array*/ = [...tmpArrSpread];
const N /*:unknown*/ = ARR.shift();
$(N);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([`a`, `b`, `c`]);
$([...tmpArrSpread].shift());
`````

## Pre Normal


`````js filename=intro
const ARR = [...$([`a`, `b`, `c`])];
const N = ARR.shift();
$(N);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`a`, `b`, `c`];
const tmpArrSpread = $(tmpCalleeParam);
const ARR = [...tmpArrSpread];
const N = ARR.shift();
$(N);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $( a );
const c = [ ...b ];
const d = c.shift();
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
