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
const arr /*:array*/ = $Array_from(tmpMCP);
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
$coerce(b, `number`);
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
