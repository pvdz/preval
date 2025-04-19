# Preval test case

# string_includes_known_coerced_spy_idx.md

> Type tracked > String method > String includes known coerced spy idx

## Options

- globals: a b c

## Input

`````js filename=intro
const bool1 = '123'.includes($spy(1), 1); // coerced to string
const bool2 = '321'.includes($spy(1), 1); // coerced to string
$(bool1, bool2);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(1);
const tmpttr$1 /*:string*/ = $coerce(tmpCalleeParam, `string`);
const bool1 /*:boolean*/ = $dotCall($string_includes, `123`, `includes`, tmpttr$1, 1);
const tmpCalleeParam$1 /*:unknown*/ = $spy(1);
const tmpttr /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const bool2 /*:boolean*/ = $dotCall($string_includes, `321`, `includes`, tmpttr, 1);
$(bool1, bool2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  $dotCall($string_includes, `123`, `includes`, $coerce($spy(1), `string`), 1),
  $dotCall($string_includes, `321`, `includes`, $coerce($spy(1), `string`), 1),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 1 );
const b = $coerce( a, "string" );
const c = $dotCall( $string_includes, "123", "includes", b, 1 );
const d = $spy( 1 );
const e = $coerce( d, "string" );
const f = $dotCall( $string_includes, "321", "includes", e, 1 );
$( c, f );
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
 - 5: false, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
