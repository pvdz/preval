# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]?.[$("y")]) || (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpObjLitVal /*:object*/ /*truthy*/ = { y: 1 };
const b /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$3) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$3 /*:unknown*/ = $(`x`);
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$3 == null;
    if (tmpIfTest$5) {
      $(undefined);
      $(undefined);
    } else {
      const tmpChainRootComputed$5 /*:unknown*/ = $(`y`);
      const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = tmpChainElementObject$3[tmpChainRootComputed$5];
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`y`);
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    if (tmpChainElementObject$3 == null) {
      $(undefined);
      $(undefined);
    } else {
      const tmpChainRootComputed$5 = $(`y`);
      const tmpClusterSSA_tmpNestedComplexRhs = tmpChainElementObject$3[tmpChainRootComputed$5];
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { y: 1 };
const c = { x: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "y" );
    a = g[ i ];
  }
}
if (a) {
  $( a );
  $( a );
}
else {
  const j = $( c );
  const k = j == null;
  if (k) {
    $( undefined );
    $( undefined );
  }
  else {
    const l = $( "x" );
    const m = j[ l ];
    const n = m == null;
    if (n) {
      $( undefined );
      $( undefined );
    }
    else {
      const o = $( "y" );
      const p = m[ o ];
      $( p );
      $( p );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  } else {
  }
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$3 = tmpChainElementCall$1 != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$3 = $(`x`);
    const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    if (tmpIfTest$5) {
      const tmpChainRootComputed$5 = $(`y`);
      const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
      tmpNestedComplexRhs = tmpChainElementObject$5;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
