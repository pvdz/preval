# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)?.[$("x")]?.[$("y")]) : $(200));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
  const tmpObjLitVal /*:object*/ = { y: 1 };
  const b /*:object*/ = { x: tmpObjLitVal };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`x`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
      const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
      tmpNestedComplexRhs = tmpChainElementObject$1;
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(1)) {
  let tmpNestedComplexRhs = undefined;
  const tmpObjLitVal = { y: 1 };
  const tmpChainElementCall = $({ x: tmpObjLitVal });
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      const tmpChainRootComputed$1 = $(`y`);
      tmpNestedComplexRhs = tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $($(200));
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)?.[$(`x`)]?.[$(`y`)]) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      tmpNestedComplexRhs = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  let c = undefined;
  const d = { y: 1 };
  const e = { x: d };
  const f = $( e );
  const g = f == null;
  if (g) {

  }
  else {
    const h = $( "x" );
    const i = f[ h ];
    const j = i == null;
    if (j) {

    }
    else {
      const k = $( "y" );
      const l = i[ k ];
      c = l;
    }
  }
  a = c;
  $( c );
}
else {
  const m = $( 200 );
  $( m );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
