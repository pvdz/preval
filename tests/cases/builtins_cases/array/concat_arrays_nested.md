# Preval test case

# concat_arrays_nested.md

> Builtins cases > Array > Concat arrays nested
>
> const a = [];

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce( e, "plustr" );
$(f);
`````


## Settled


`````js filename=intro
$(`,`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`,`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "," );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const tmpMCF = b.concat;
const e = $dotCall(tmpMCF, b, `concat`, d);
const f = $coerce(e, `plustr`);
$(f);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ','
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
