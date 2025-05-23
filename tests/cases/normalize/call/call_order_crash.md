# Preval test case

# call_order_crash.md

> Normalize > Call > Call order crash
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
crash($spy('a'), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
crash;
const tmpCalleeParam /*:unknown*/ = $spy(`a`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$3 /*:unknown*/ = $spy(`c`);
crash(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
crash;
crash($spy(`a`), $spy(`b`), $spy(`c`));
`````


## PST Settled
With rename=true

`````js filename=intro
crash;
const a = $spy( "a" );
const b = $spy( "b" );
const c = $spy( "c" );
crash( a, b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallCallee = crash;
let tmpCalleeParam = $spy(`a`);
let tmpCalleeParam$1 = $spy(`b`);
let tmpCalleeParam$3 = $spy(`c`);
crash(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

crash


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
