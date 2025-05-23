# Preval test case

# string_includes_known_coerced_spy.md

> Type tracked > String method > String includes known coerced spy

## Input

`````js filename=intro
const bool1 = '123'.includes($spy(1)); // coerced to string
const bool2 = '321'.includes($spy(1)); // coerced to string
$(bool1, bool2);
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $spy(1);
const tmpttr$1 /*:string*/ = $coerce(tmpMCP, `string`);
const bool1 /*:boolean*/ = $dotCall($string_includes, `123`, `includes`, tmpttr$1);
const tmpMCP$1 /*:unknown*/ = $spy(1);
const tmpttr /*:string*/ = $coerce(tmpMCP$1, `string`);
const bool2 /*:boolean*/ = $dotCall($string_includes, `321`, `includes`, tmpttr);
$(bool1, bool2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  $dotCall($string_includes, `123`, `includes`, $coerce($spy(1), `string`)),
  $dotCall($string_includes, `321`, `includes`, $coerce($spy(1), `string`)),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 1 );
const b = $coerce( a, "string" );
const c = $dotCall( $string_includes, "123", "includes", b );
const d = $spy( 1 );
const e = $coerce( d, "string" );
const f = $dotCall( $string_includes, "321", "includes", e );
$( c, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_includes;
const tmpMCP = $spy(1);
const bool1 = $dotCall(tmpMCF, `123`, `includes`, tmpMCP);
const tmpMCF$1 = $string_includes;
const tmpMCP$1 = $spy(1);
const bool2 = $dotCall(tmpMCF$1, `321`, `includes`, tmpMCP$1);
$(bool1, bool2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].toString()', 1
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: true, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
