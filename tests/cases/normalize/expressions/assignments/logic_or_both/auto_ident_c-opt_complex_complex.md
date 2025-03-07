# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]) || (a = $(b)?.[$("x")]));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpCalleeParam /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
  tmpCalleeParam = tmpChainElementObject;
}
if (a) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$1];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpCalleeParam = undefined;
if (!tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
  tmpCalleeParam = tmpChainElementObject;
}
if (a) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall$1 = $(b);
  if (!(tmpChainElementCall$1 == null)) {
    const tmpChainRootComputed$1 = $(`x`);
    tmpNestedComplexRhs = tmpChainElementCall$1[tmpChainRootComputed$1];
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$(`x`)]) || (a = $(b)?.[$(`x`)]));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  const tmpIfTest$1 = tmpChainElementCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`x`);
    const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {

}
else {
  const f = $( "x" );
  const g = c[ f ];
  a = g;
  e = g;
}
if (a) {
  $( e );
}
else {
  let h = undefined;
  const i = $( b );
  const j = i == null;
  if (j) {

  }
  else {
    const k = $( "x" );
    const l = i[ k ];
    h = l;
  }
  a = h;
  $( h );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
