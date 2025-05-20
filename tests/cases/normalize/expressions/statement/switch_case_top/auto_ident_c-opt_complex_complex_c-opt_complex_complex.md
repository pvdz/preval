# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Switch case top > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(b)?.[$("x")]?.[$("y")];
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal /*:object*/ = { y: 1 };
  const b /*:object*/ = { x: tmpObjLitVal };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`x`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$3) {
      $(a);
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
      tmpChainElementObject[tmpChainRootComputed$1];
      $(a);
    }
  }
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal = { y: 1 };
  const tmpChainElementCall = $({ x: tmpObjLitVal });
  if (tmpChainElementCall == null) {
    $(a);
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject == null) {
      $(a);
    } else {
      const tmpChainRootComputed$1 = $(`y`);
      tmpChainElementObject[tmpChainRootComputed$1];
      $(a);
    }
  }
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = { y: 1 };
  const f = { x: e };
  const g = $( f );
  const h = g == null;
  if (h) {
    $( d );
  }
  else {
    const i = $( "x" );
    const j = g[ i ];
    const k = j == null;
    if (k) {
      $( d );
    }
    else {
      const l = $( "y" );
      j[ l ];
      $( d );
    }
  }
}
else {
  $( d );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '{"y":"1"}' }
 - 4: 'x'
 - 5: 'y'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
