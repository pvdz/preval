# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Template > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${$(b)?.x}  after`);
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
  const tmpCalleeParam$1 /*:unknown*/ = tmpChainElementCall.x;
  const tmpStringConcatL /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
  const tmpCalleeParam /*:string*/ = `before  ${tmpStringConcatL}  after`;
  $(tmpCalleeParam);
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
  $(`before  ${tmpChainElementCall.x}  after`);
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
  const d = b.x;
  const e = $coerce( d, "string" );
  const f = `before  ${e}  after`;
  $( f );
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'before 1 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
