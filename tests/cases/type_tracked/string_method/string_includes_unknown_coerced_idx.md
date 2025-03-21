# Preval test case

# string_includes_unknown_coerced_idx.md

> Type tracked > String method > String includes unknown coerced idx

## Options

- globals: a b c

## Input

`````js filename=intro
const str = String($spy());
const bool = str.includes(1, 1); // coerced to string
$(bool);
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $spy();
const str /*:string*/ = $coerce(tmpStringFirstArg, `string`);
const bool /*:boolean*/ = str.includes(`1`, 1);
$(bool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($spy(), `string`).includes(`1`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "string" );
const c = b.includes( "1", 1 );
$( c );
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
