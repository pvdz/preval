# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")] + $(b)?.[$("x")];
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  tmpBinBothLhs = tmpChainElementCall[tmpChainRootComputed];
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
  tmpBinBothRhs = tmpChainElementCall$1[tmpChainRootComputed$1];
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpBinBothLhs = tmpChainElementCall[tmpChainRootComputed];
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$1 = $(b);
if (!(tmpChainElementCall$1 == null)) {
  const tmpChainRootComputed$1 = $(`x`);
  tmpBinBothRhs = tmpChainElementCall$1[tmpChainRootComputed$1];
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  a = c[ e ];
}
let f = undefined;
const g = $( b );
const h = g == null;
if (h) {

}
else {
  const i = $( "x" );
  f = g[ i ];
}
a + f;
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
