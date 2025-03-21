# Preval test case

# flipflop3.md

> Spyless vars > Flipflop3
>
> Example case of two statements that flip-flop when spyless vars is applied incorrectly.
> This can end up being an infinite transform loop.
> (This may end up superseded by a rule that knows things can't be instanceof / in of NaN ...)

## Input

`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
const arr = [a, b, c];
$(arr);
`````


## Settled


`````js filename=intro
const x /*:object*/ = {};
const a /*:boolean*/ = x instanceof String;
const b /*:boolean*/ = x instanceof Function;
const c /*:boolean*/ = x instanceof Array;
const arr /*:array*/ = [a, b, c];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {};
const a = x instanceof String;
const b = x instanceof Function;
const c = x instanceof Array;
$([a, b, c]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = a instanceof String;
const c = a instanceof Function;
const d = a instanceof Array;
const e = [ b, c, d ];
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [false, false, false]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
