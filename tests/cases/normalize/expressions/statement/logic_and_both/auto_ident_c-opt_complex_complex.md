# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")] && $(b)?.[$("x")];
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
    tmpChainElementCall$1[tmpChainRootComputed$1];
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpIfTest = tmpChainElementCall[tmpChainRootComputed];
}
if (tmpIfTest) {
  const tmpChainElementCall$1 = $(b);
  if (!(tmpChainElementCall$1 == null)) {
    const tmpChainRootComputed$1 = $(`x`);
    tmpChainElementCall$1[tmpChainRootComputed$1];
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(b)?.[$(`x`)] && $(b)?.[$(`x`)];
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
} else {
}
if (tmpIfTest) {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  const tmpIfTest$3 = tmpChainElementCall$1 != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$1 = $(`x`);
    const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
  } else {
  }
} else {
}
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
if (a) {
  const g = $( b );
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "x" );
    g[ i ];
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
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
