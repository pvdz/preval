# Preval test case

# json_roundtrip_negzero.md

> Math > Ai > Json roundtrip negzero
>
> JSON round-trip loses -0

## Input

`````js filename=intro
const a = $(-0);
const b = JSON.parse(JSON.stringify(-0));
$(1 / a);
$(1 / b);
// Should be -Infinity for a, Infinity for b
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-0);
const tmpMCP /*:primitive*/ = $JSON_stringify(-0);
const b /*:unknown*/ = $JSON_parse(tmpMCP);
const tmpCalleeParam /*:number*/ = 1 / a;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = 1 / b;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(-0);
const b = $JSON_parse($JSON_stringify(-0));
$(1 / a);
$(1 / b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -0 );
const b = $JSON_stringify( -0 );
const c = $JSON_parse( b );
const d = 1 / a;
$( d );
const e = 1 / c;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(-0);
const tmpMCF = $JSON_parse;
const tmpMCF$1 = $JSON_stringify;
const tmpMCP = $JSON_stringify(-0);
const b = $dotCall(tmpMCF, JSON, `parse`, tmpMCP);
let tmpCalleeParam = 1 / a;
$(tmpCalleeParam);
let tmpCalleeParam$1 = 1 / b;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $JSON_parse
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: -Infinity
 - 3: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
