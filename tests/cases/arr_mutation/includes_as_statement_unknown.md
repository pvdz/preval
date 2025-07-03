# Preval test case

# includes_as_statement_unknown.md

> Arr mutation > Includes as statement unknown

## Options

- globals: a b c

## Input

`````js filename=intro
const arr = Array.from($spy());
arr.includes(a, b, c);
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy();
const arr /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
a;
$coerce(b, `number`);
c;
const tmpCalleeParam /*:number*/ = arr.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $Array_from($spy());
a;
Number(b);
c;
$(arr.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const d = $spy();
const e = $Array_from( d );
a;
$coerce( b, "number" );
c;
const f = e.length;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpMCP = $spy();
const arr = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
const tmpMCF$1 = arr.includes;
$dotCall(tmpMCF$1, arr, `includes`, a, b, c);
let tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_includes
- (todo) type trackeed tricks can possibly support static $Array_from


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
