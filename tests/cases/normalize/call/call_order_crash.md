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
const tmpCallCallee /*:unknown*/ = crash;
const tmpCalleeParam /*:unknown*/ = $spy(`a`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$3 /*:unknown*/ = $spy(`c`);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
crash($spy(`a`), $spy(`b`), $spy(`c`));
`````

## Pre Normal


`````js filename=intro
crash($spy(`a`), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = crash;
const tmpCalleeParam = $spy(`a`);
const tmpCalleeParam$1 = $spy(`b`);
const tmpCalleeParam$3 = $spy(`c`);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = crash;
const b = $spy( "a" );
const c = $spy( "b" );
const d = $spy( "c" );
a( b, c, d );
`````

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
