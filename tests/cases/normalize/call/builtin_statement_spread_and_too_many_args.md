# Preval test case

# builtin_statement_spread_and_too_many_args.md

> Normalize > Call > Builtin statement spread and too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
isNaN(...$([1, 2, 3, 4]), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpArgOverflow /*:array*/ /*truthy*/ = [...tmpArrSpread];
$spy(`b`);
$spy(`c`);
const tmpEA1 /*:unknown*/ = tmpArgOverflow[0];
$coerce(tmpEA1, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([1, 2, 3, 4]);
const tmpArgOverflow = [...tmpArrSpread];
$spy(`b`);
$spy(`c`);
$coerce(tmpArgOverflow[0], `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = $( a );
const c = [ ...b ];
$spy( "b" );
$spy( "c" );
const d = c[ 0 ];
$coerce( d, "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3, 4];
const tmpArrSpread = $(tmpCalleeParam);
const tmpArgOverflow = [...tmpArrSpread];
$spy(`b`);
$spy(`c`);
const tmpEA1 = tmpArgOverflow[0];
$coerce(tmpEA1, `number`);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
