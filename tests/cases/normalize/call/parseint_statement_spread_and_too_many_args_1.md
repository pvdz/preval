# Preval test case

# parseint_statement_spread_and_too_many_args_1.md

> Normalize > Call > Parseint statement spread and too many args 1
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
parseInt(...$([1]), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [1];
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:unknown*/ = $spy(`b`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(`c`);
$Number_parseInt(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $([1]);
const tmpCalleeParam = $spy(`b`);
const tmpCalleeParam$1 = $spy(`c`);
$Number_parseInt(...tmpCalleeParamSpread, tmpCalleeParam, tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
const b = $( a );
const c = $spy( "b" );
const d = $spy( "c" );
$Number_parseInt( ...b, c, d );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - 4: '$spy[1].valueOf()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
