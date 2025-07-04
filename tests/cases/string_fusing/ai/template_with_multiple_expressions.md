# Preval test case

# template_with_multiple_expressions.md

> String fusing > Ai > Template with multiple expressions
>
> Test template with multiple expressions that should be preserved during fusion

## Input

`````js filename=intro
const a = $("a");
const b = $("b");
const c = $("c");
const multiExpr = `start${a}middle${b}end`;
const result = multiExpr + c;
$(result);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const b /*:unknown*/ = $(`b`);
const c /*:unknown*/ = $(`c`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(a, `string`);
const tmpBinBothRhs /*:string*/ = $coerce(b, `string`);
const multiExpr /*:string*/ /*truthy*/ = `start${tmpBinBothRhs$1}middle${tmpBinBothRhs}end`;
const result /*:string*/ = multiExpr + c;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const c = $(`c`);
const tmpBinBothRhs$1 = String(a);
const tmpBinBothRhs = String(b);
$(`start${tmpBinBothRhs$1}middle${tmpBinBothRhs}end` + c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = $( "c" );
const d = $coerce( a, "string" );
const e = $coerce( b, "string" );
const f = `start${d}middle${e}end`;
const g = f + c;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const c = $(`c`);
const tmpBinBothLhs$1 = `start`;
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR}middle`;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const multiExpr = `${tmpStringConcatR$1}end`;
const result = multiExpr + c;
$(result);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'startamiddlebendc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
