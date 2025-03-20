# Preval test case

# call_order.md

> Normalize > Call > Call order
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
$spy(isNaN)($spy('a'), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $spy(isNaN);
const tmpCalleeParam /*:unknown*/ = $spy(`a`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$3 /*:unknown*/ = $spy(`c`);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $spy(isNaN);
tmpCallCallee($spy(`a`), $spy(`b`), $spy(`c`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( isNaN );
const b = $spy( "a" );
const c = $spy( "b" );
const d = $spy( "c" );
a( b, c, d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['<function>', '<function>']
 - 2: 'Creating spy', 2, 1, ['a', 'a']
 - 3: 'Creating spy', 3, 1, ['b', 'b']
 - 4: 'Creating spy', 4, 1, ['c', 'c']
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
