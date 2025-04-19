# Preval test case

# method_call_eval_order2.md

> Function > Method call eval order2

## Input

`````js filename=intro
// a[b](c, d)
$spy('a')[$spy('b')]($spy('c'), $spy('d'));
`````


## Settled


`````js filename=intro
const tmpMCCO /*:unknown*/ = $spy(`a`);
const tmpMCCP /*:unknown*/ = $spy(`b`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpMCP /*:unknown*/ = $spy(`c`);
const tmpMCP$1 /*:unknown*/ = $spy(`d`);
$dotCall(tmpMCF, tmpMCCO, undefined, tmpMCP, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $spy(`a`);
const tmpMCCP = $spy(`b`);
tmpMCCO[tmpMCCP]($spy(`c`), $spy(`d`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
const c = a[ b ];
const d = $spy( "c" );
const e = $spy( "d" );
$dotCall( c, a, undefined, d, e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[2].toString()', 'b'
 - 4: 'Creating spy', 3, 1, ['c', 'c']
 - 5: 'Creating spy', 4, 1, ['d', 'd']
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
