# Preval test case

# builtin_statement_spread_and_too_many_args.md

> Normalize > Call > Builtin statement spread and too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
const is = isNaN(...$([1, 2, 3, 4]), $spy('b'), $spy('c'));
$(is);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParamSpread /*:array*/ /*truthy*/ = [...tmpArrSpread];
const tmpCalleeParam /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`c`);
const is /*:boolean*/ = isNaN(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
$(is);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([1, 2, 3, 4]);
const tmpCalleeParamSpread = [...tmpArrSpread];
const tmpCalleeParam = $spy(`b`);
const tmpCalleeParam$1 = $spy(`c`);
$(isNaN(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = $( a );
const c = [ ...b ];
const d = $spy( "b" );
const e = $spy( "c" );
const f = isNaN( ...c, d, e );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$3 = [1, 2, 3, 4];
const tmpArrSpread = $(tmpCalleeParam$3);
let tmpCalleeParamSpread = [...tmpArrSpread];
let tmpCalleeParam = $spy(`b`);
let tmpCalleeParam$1 = $spy(`c`);
const is = isNaN(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
$(is);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
