# Preval test case

# math_chain_coercion.md

> Math > Ai > Math chain coercion
>
> Math result used in string template and as property key

## Input

`````js filename=intro
const a = $(Math.round(1.2345 * 100) / 100);
const obj = {};
obj[`${a}`] = "rounded";
$(obj["1.23"]);
// Should be "rounded"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.23);
const tmpAssignComMemLhsProp /*:string*/ = $coerce(a, `string`);
const obj /*:object*/ /*truthy*/ = {};
obj[tmpAssignComMemLhsProp] = `rounded`;
const tmpCalleeParam$1 /*:unknown*/ = obj[`1.23`];
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignComMemLhsProp = String($(1.23));
const obj = {};
obj[tmpAssignComMemLhsProp] = `rounded`;
$(obj[`1.23`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.23 );
const b = $coerce( a, "string" );
const c = {};
c[b] = "rounded";
const d = c[ "1.23" ];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_round;
const tmpMCP = 123.44999999999999;
const tmpBinLhs = $dotCall(tmpMCF, Math, `round`, tmpMCP);
let tmpCalleeParam = tmpBinLhs / 100;
const a = $(tmpCalleeParam);
const obj = {};
const tmpAssignComMemLhsObj = obj;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs + tmpBinBothRhs;
const tmpAssignComMemLhsProp = $coerce(tmpBinLhs$1, `plustr`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = `rounded`;
let tmpCalleeParam$1 = obj[`1.23`];
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.23
 - 2: 'rounded'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
