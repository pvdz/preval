# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpObjLitVal /*:object*/ /*truthy*/ = { y: 1 };
  const b /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
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
      const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
} else {
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
      const tmpClusterSSA_tmpNestedComplexRhs = tmpChainElementObject[tmpChainRootComputed$1];
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
  const c = { y: 1 };
  const d = { x: c };
  const e = $( d );
  const f = e == null;
  if (f) {
    $( undefined );
    $( undefined );
  }
  else {
    const g = $( "x" );
    const h = e[ g ];
    const i = h == null;
    if (i) {
      $( undefined );
      $( undefined );
    }
    else {
      const j = $( "y" );
      const k = h[ j ];
      $( k );
      $( k );
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
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
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
      tmpNestedComplexRhs = tmpChainElementObject$1;
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
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
