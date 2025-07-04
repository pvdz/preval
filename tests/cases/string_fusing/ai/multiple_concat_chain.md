# Preval test case

# multiple_concat_chain.md

> String fusing > Ai > Multiple concat chain
>
> Test chain of multiple concatenations that should be fused together

## Input

`````js filename=intro
const a = String($("a"));
const b = String($("b"));
const c = String($("c"));
const result = a + b + c;
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
const result /*:string*/ = `${a}${b}${c}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = String($(`a`));
const b = String($(`b`));
const c = String($(`c`));
$(`${a}${b}${c}`);
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
const g = `${b}${d}${f}`;
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
const tmpBinLhs = a + b;
const result = tmpBinLhs + c;
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
 - 4: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
