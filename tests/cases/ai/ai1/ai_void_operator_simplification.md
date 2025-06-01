# Preval test case

# ai_void_operator_simplification.md

> Ai > Ai1 > Ai void operator simplification
>
> Test: void operator simplification.

## Input

`````js filename=intro
// Expected (with side-effect): $("effect"); let x = undefined; $("is_undefined", x === undefined);
// Expected (no side-effect): let y = undefined; $("is_undefined", y === undefined);
let x = void $("effect");
$("is_undefined", x === undefined);

let y = void 0;
$("is_undefined", y === undefined);
`````


## Settled


`````js filename=intro
$(`effect`);
$(`is_undefined`, true);
$(`is_undefined`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`effect`);
$(`is_undefined`, true);
$(`is_undefined`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "effect" );
$( "is_undefined", true );
$( "is_undefined", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`effect`);
let x = undefined;
let tmpCalleeParam = x === undefined;
$(`is_undefined`, tmpCalleeParam);
let y = undefined;
let tmpCalleeParam$1 = y === undefined;
$(`is_undefined`, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'effect'
 - 2: 'is_undefined', true
 - 3: 'is_undefined', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
