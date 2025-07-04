# Preval test case

# complex_nested_fusion.md

> String fusing > Ai > Complex nested fusion
>
> Test complex nested fusion scenarios with multiple levels

## Input

`````js filename=intro
const a = String($("a"));
const b = String($("b"));
const c = String($("c"));
const inner = `inner${a}`;
const middle = `middle${b}`;
const outer = `outer${inner}${middle}`;
const result = outer + c;
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`a`);
const a /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`b`);
const b /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam$3 /*:unknown*/ = $(`c`);
const c /*:string*/ = $coerce(tmpCalleeParam$3, `string`);
const result /*:string*/ /*truthy*/ = `outerinner${a}middle${b}${c}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = String($(`a`));
const b = String($(`b`));
const c = String($(`c`));
$(`outerinner${a}middle${b}${c}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "string" );
const c = $( "b" );
const d = $coerce( c, "string" );
const e = $( "c" );
const f = $coerce( e, "string" );
const g = `outerinner${b}middle${d}${f}`;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`a`);
const a = $coerce(tmpCalleeParam, `string`);
let tmpCalleeParam$1 = $(`b`);
const b = $coerce(tmpCalleeParam$1, `string`);
let tmpCalleeParam$3 = $(`c`);
const c = $coerce(tmpCalleeParam$3, `string`);
const tmpBinBothLhs = `inner`;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const inner = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = `middle`;
const tmpBinBothRhs$1 = $coerce(b, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const middle = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs$5 = `outer`;
const tmpBinBothRhs$5 = $coerce(inner, `string`);
const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
const tmpBinBothLhs$3 = $coerce(tmpBinLhs$5, `plustr`);
const tmpBinBothRhs$3 = $coerce(middle, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const outer = $coerce(tmpBinLhs$3, `plustr`);
const result = outer + c;
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
 - 4: 'outerinneramiddlebc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
