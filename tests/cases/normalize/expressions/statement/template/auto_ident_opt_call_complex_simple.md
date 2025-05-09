# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Template > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($)?.(1)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`before  undefined  after`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
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
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(`before  undefined  after`);
} else {
  $(`before  ${$dotCall(tmpChainElementCall, $, undefined, 1)}  after`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( "before  undefined  after" );
}
else {
  const c = $dotCall( a, $, undefined, 1 );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
