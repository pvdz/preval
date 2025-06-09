# Preval test case

# string_includes_unknown_coerced_spy.md

> Type tracked > String method > String includes unknown coerced spy

## Options

- globals: a b c

## Input

`````js filename=intro
const str = String($spy());
const bool = str.includes($spy()); // coerced to string
$(bool);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy();
const str /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpMCP /*:unknown*/ = $spy();
const bool /*:boolean*/ = $dotCall($string_includes, str, `includes`, tmpMCP);
$(bool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $coerce($spy(), `string`);
$($dotCall($string_includes, str, `includes`, $spy()));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
const c = $spy();
const d = $dotCall( $string_includes, b, "includes", c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy();
const str = $coerce(tmpCalleeParam, `string`);
const tmpMCF = str.includes;
const tmpMCP = $spy();
const bool = $dotCall(tmpMCF, str, `includes`, tmpMCP);
$(bool);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].toString()'
 - 3: 'Creating spy', 2, 0, ['spy', 12345]
 - 4: '$spy[2].toString()'
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
