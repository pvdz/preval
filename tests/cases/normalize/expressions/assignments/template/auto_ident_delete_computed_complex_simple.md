# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete $(arg)["y"])}  after`);
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const tmpClusterSSA_a$1 /*:boolean*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpClusterSSA_a);
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpClusterSSA_a$1) {
  const tmpRet = `before  ${tmpClusterSSA_a$1}  after`;
  return tmpRet;
};
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
$($frfr(tmpFree, tmpClusterSSA_a));
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = delete $(arg)[`y`]), `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = { y: 1 };
const g = $( f );
const h = delete g.y;
const i = j( a, h );
$( i );
$( h, f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'before true after'
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
