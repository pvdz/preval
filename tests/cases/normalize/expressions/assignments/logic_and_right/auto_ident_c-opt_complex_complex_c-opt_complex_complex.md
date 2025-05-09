# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:object*/ = { y: 1 };
  const b /*:object*/ = { x: tmpObjLitVal };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`x`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$1) {
      $(undefined);
      $(undefined);
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
      const tmpNestedComplexRhs /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = { y: 1 };
  const tmpChainElementCall = $({ x: tmpObjLitVal });
  if (tmpChainElementCall == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject == null) {
      $(undefined);
      $(undefined);
    } else {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpNestedComplexRhs = tmpChainElementObject[tmpChainRootComputed$1];
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = { y: 1 };
  const c = { x: b };
  const d = $( c );
  const e = d == null;
  if (e) {
    $( undefined );
    $( undefined );
  }
  else {
    const f = $( "x" );
    const g = d[ f ];
    const h = g == null;
    if (h) {
      $( undefined );
      $( undefined );
    }
    else {
      const i = $( "y" );
      const j = g[ i ];
      $( j );
      $( j );
    }
  }
}
else {
  $( a );
  const k = {
    a: 999,
    b: 1000,
  };
  $( k );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
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
