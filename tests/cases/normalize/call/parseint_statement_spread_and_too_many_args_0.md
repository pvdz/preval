# Preval test case

# parseint_statement_spread_and_too_many_args_0.md

> Normalize > Call > Parseint statement spread and too many args 0
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
parseInt(...$([]), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParamSpread /*:array*/ /*truthy*/ = [...tmpArrSpread];
const tmpCalleeParam /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`c`);
$Number_parseInt(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([]);
const tmpCalleeParamSpread = [...tmpArrSpread];
const tmpCalleeParam = $spy(`b`);
const tmpCalleeParam$1 = $spy(`c`);
$Number_parseInt(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = [ ...b ];
const d = $spy( "b" );
const e = $spy( "c" );
$Number_parseInt( ...c, d, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$3 = [];
const tmpArrSpread = $(tmpCalleeParam$3);
let tmpCalleeParamSpread = [...tmpArrSpread];
let tmpCalleeParam = $spy(`b`);
let tmpCalleeParam$1 = $spy(`c`);
$Number_parseInt(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - 4: '$spy[1].toString()', 'b'
 - 5: '$spy[2].valueOf()', 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
