# Preval test case

# string_includes_unknown_idx.md

> Type tracked > String method > String includes unknown idx

## Options

- globals: a b c

## Input

`````js filename=intro
const str = String($spy());
const bool = str.includes('1', 2);
$(bool);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy();
const str /*:string*/ = $coerce(tmpCalleeParam, `string`);
const bool /*:boolean*/ = $dotCall($string_includes, str, `includes`, `1`, 2);
$(bool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_includes, $coerce($spy(), `string`), `includes`, `1`, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
const c = $dotCall( $string_includes, b, "includes", "1", 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy();
const str = $coerce(tmpCalleeParam, `string`);
const tmpMCF = str.includes;
const bool = $dotCall(tmpMCF, str, `includes`, `1`, 2);
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
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
