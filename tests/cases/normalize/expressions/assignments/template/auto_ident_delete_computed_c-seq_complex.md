# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete ($(1), $(2), $(arg))[$("y")])}  after`);
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
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
$($frfr(tmpFree, tmpClusterSSA_a));
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = delete ($(1), $(2), $(arg))[$(`y`)]), `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
$( 1 );
$( 2 );
const f = { y: 1 };
const g = $( f );
const h = $( "y" );
const i = delete g[ h ];
const j = k( a, i );
$( j );
$( i, f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 'before true after'
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
