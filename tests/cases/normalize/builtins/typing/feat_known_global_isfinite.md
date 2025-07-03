# Preval test case

# feat_known_global_isfinite.md

> Normalize > Builtins > Typing > Feat known global isfinite
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof isFinite($spy('isFinite')));
//$(typeof Number.isFinite($spy('Number.isFinite')));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`isFinite`);
$coerce(tmpCalleeParam$1, `number`);
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
Number($spy(`isFinite`));
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "isFinite" );
$coerce( a, "number" );
$( "boolean" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $spy(`isFinite`);
const tmpUnaryArg = isFinite(tmpCalleeParam$1);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['isFinite', 'isFinite']
 - 2: '$spy[1].valueOf()', 'isFinite'
 - 3: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
