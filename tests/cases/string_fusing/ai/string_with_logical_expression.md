# Preval test case

# string_with_logical_expression.md

> String fusing > Ai > String with logical expression
>
> Test string concatenation with logical expressions

## Input

`````js filename=intro
const a = $("hello");
const b = $("world");
const result = "result: " + (a || b);
$(result);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`hello`);
const b /*:unknown*/ = $(`world`);
if (a) {
  const tmpClusterSSA_tmpStringConcatL /*:string*/ = $coerce(a, `plustr`);
  const tmpClusterSSA_result /*:string*/ /*truthy*/ = `result: ${tmpClusterSSA_tmpStringConcatL}`;
  $(tmpClusterSSA_result);
} else {
  const tmpClusterSSA_tmpStringConcatL$1 /*:string*/ = $coerce(b, `plustr`);
  const tmpClusterSSA_result$1 /*:string*/ /*truthy*/ = `result: ${tmpClusterSSA_tmpStringConcatL$1}`;
  $(tmpClusterSSA_result$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`hello`);
const b = $(`world`);
if (a) {
  const tmpClusterSSA_tmpStringConcatL = a + ``;
  $(`result: ${tmpClusterSSA_tmpStringConcatL}`);
} else {
  const tmpClusterSSA_tmpStringConcatL$1 = b + ``;
  $(`result: ${tmpClusterSSA_tmpStringConcatL$1}`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $( "world" );
if (a) {
  const c = $coerce( a, "plustr" );
  const d = `result: ${c}`;
  $( d );
}
else {
  const e = $coerce( b, "plustr" );
  const f = `result: ${e}`;
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`hello`);
const b = $(`world`);
const tmpBinBothLhs = `result: `;
let tmpBinBothRhs = a;
if (tmpBinBothRhs) {
} else {
  tmpBinBothRhs = b;
}
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'world'
 - 3: 'result: hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
