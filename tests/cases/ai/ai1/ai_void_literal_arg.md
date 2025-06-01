# Preval test case

# ai_void_literal_arg.md

> Ai > Ai1 > Ai void literal arg
>
> Test: void operator with a literal argument should simplify to undefined.

## Input

`````js filename=intro
// Expected: let x = undefined; $('check', typeof x, x === undefined);
let x = void 'abc';
$('check', typeof x, x === undefined);

let y = void 123;
$('check', typeof y, y === undefined);

let z = void true;
$('check', typeof z, z === undefined);
`````


## Settled


`````js filename=intro
$(`check`, `undefined`, true);
$(`check`, `undefined`, true);
$(`check`, `undefined`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`check`, `undefined`, true);
$(`check`, `undefined`, true);
$(`check`, `undefined`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "check", "undefined", true );
$( "check", "undefined", true );
$( "check", "undefined", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let tmpCalleeParam = typeof x;
let tmpCalleeParam$1 = x === undefined;
$(`check`, tmpCalleeParam, tmpCalleeParam$1);
let y = undefined;
let tmpCalleeParam$3 = typeof y;
let tmpCalleeParam$5 = y === undefined;
$(`check`, tmpCalleeParam$3, tmpCalleeParam$5);
let z = undefined;
let tmpCalleeParam$7 = typeof z;
let tmpCalleeParam$9 = z === undefined;
$(`check`, tmpCalleeParam$7, tmpCalleeParam$9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'check', 'undefined', true
 - 2: 'check', 'undefined', true
 - 3: 'check', 'undefined', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
