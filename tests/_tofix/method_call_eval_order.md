# Preval test case

# method_call_eval_order.md

> Tofix > method call eval order

existing test case
the problem in denorm is that the args are not evaluated up front
and so the original invokes the spies first and then does a[b](c)
whereas the denormalized version calls a and b first but then does
the a[b] part, which triggers the b-spy, after which it creates teh
c and d spies. that's why there's a delta and it proves that denorm
shouldnt just inline them like that. similar case should be created
for static props triggering a getter.

## Input

`````js filename=intro
// a[b](c, d)
const a = $spy('a');
const b = $spy('b');
const c = $spy('c');
const d = $spy('d');
a[b](c, d);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $spy(`a`);
const b /*:unknown*/ = $spy(`b`);
const c /*:unknown*/ = $spy(`c`);
const d /*:unknown*/ = $spy(`d`);
const tmpMCF /*:unknown*/ = a[b];
$dotCall(tmpMCF, a, undefined, c, d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $spy(`a`);
const b = $spy(`b`);
a[b]($spy(`c`), $spy(`d`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
const c = $spy( "c" );
const d = $spy( "d" );
const e = a[ b ];
$dotCall( e, a, undefined, c, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $spy(`a`);
const b = $spy(`b`);
const c = $spy(`c`);
const d = $spy(`d`);
const tmpMCF = a[b];
$dotCall(tmpMCF, a, undefined, c, d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - 4: 'Creating spy', 4, 1, ['d', 'd']
 - 5: '$spy[2].toString()', 'b'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 -  1: 'Creating spy', 1, 1, ['a', 'a']
 -  2: 'Creating spy', 2, 1, ['b', 'b']
 - !3: '$spy[2].toString()', 'b'
 - !4: 'Creating spy', 3, 1, ['c', 'c']
 - !5: 'Creating spy', 4, 1, ['d', 'd']
 -  eval returned: ('<crash[ <ref> is not function/iterable ]>')
