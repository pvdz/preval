# Preval test case

# string_unknown_op_arr_empty2.md

> Normalize > Binary > With > Arr > String unknown op arr empty2
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = `${$('')}`;
const arr = [
  x == [],
];
$(arr);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(``);
const tmpBinBothLhs$1 /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpBinBothRhs$1 /*:array*/ = [];
const tmpArrElement /*:boolean*/ = tmpBinBothLhs$1 == tmpBinBothRhs$1;
const arr /*:array*/ = [tmpArrElement];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $coerce($(``), `string`) == [];
$([tmpArrElement]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = [];
const d = b == c;
const e = [ d ];
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
let tmpCalleeParam = $(``);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const x = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [];
const tmpArrElement = tmpBinBothLhs$1 == tmpBinBothRhs$1;
const arr = [tmpArrElement];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: [true]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
