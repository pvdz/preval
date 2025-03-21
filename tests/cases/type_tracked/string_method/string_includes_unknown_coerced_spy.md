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
const tmpStringFirstArg /*:unknown*/ = $spy();
const str /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpttr /*:string*/ = $coerce(tmpCalleeParam, `string`);
const bool /*:boolean*/ = str.includes(tmpttr);
$(bool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $coerce($spy(), `string`);
$(str.includes($coerce($spy(), `string`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
const c = $spy();
const d = $coerce( c, "string" );
const e = b.includes( d );
$( e );
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
