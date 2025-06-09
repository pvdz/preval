# Preval test case

# order.md

> Array > Spread > Order
>
> Who goes first

## Input

`````js filename=intro
// is b spread before or after calling a, b, and/or c?
$($('a'), ...$('b'), $('c'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`a`);
const tmpArrSpread /*:unknown*/ = $(`b`);
const tmpCalleeParamSpread /*:array*/ /*truthy*/ = [...tmpArrSpread];
const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
$(tmpCalleeParam, ...tmpCalleeParamSpread, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`a`);
const tmpArrSpread = $(`b`);
const tmpCalleeParamSpread = [...tmpArrSpread];
const tmpCalleeParam$1 = $(`c`);
$(tmpCalleeParam, ...tmpCalleeParamSpread, tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = [ ...b ];
const d = $( "c" );
$( a, ...c, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`a`);
const tmpArrSpread = $(`b`);
let tmpCalleeParamSpread = [...tmpArrSpread];
let tmpCalleeParam$1 = $(`c`);
$(tmpCalleeParam, ...tmpCalleeParamSpread, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'a', 'b', 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
