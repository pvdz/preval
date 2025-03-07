# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident c-opt complex complex
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
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$1];
  tmpBinBothRhs = tmpChainElementObject$1;
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

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(b)?.[$(`x`)] + $(b)?.[$(`x`)];
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
const tmpIfTest$1 = tmpChainElementCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed$1 = $(`x`);
  const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
  tmpBinBothRhs = tmpChainElementObject$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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
  const f = c[ e ];
  a = f;
}
let g = undefined;
const h = $( b );
const i = h == null;
if (i) {

}
else {
  const j = $( "x" );
  const k = h[ j ];
  g = k;
}
a + g;
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````

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
