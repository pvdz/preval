# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Template > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${$(b)?.[$("x")]}  after`);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`before  undefined  after`);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpChainElementObject, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
if (tmpChainElementCall == null) {
  $(`before  undefined  after`);
} else {
  const tmpChainRootComputed = $(`x`);
  $(`before  ${tmpChainElementCall[tmpChainRootComputed]}  after`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( "before  undefined  after" );
}
else {
  const d = $( "x" );
  const e = b[ d ];
  const f = $coerce( e, "string" );
  const g = `before  ${f}  after`;
  $( g );
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
