# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = (1, 2, $(b))?.x));
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
  const b /*:object*/ /*truthy*/ = { x: 1 };
  const tmpChainRootProp /*:unknown*/ = $(b);
  const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
  if (tmpIfTest) {
    $(undefined);
    $(undefined);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = tmpChainRootProp.x;
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
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
  const tmpChainRootProp = $({ x: 1 });
  if (tmpChainRootProp == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = tmpChainRootProp.x;
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
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
  const c = { x: 1 };
  const d = $( c );
  const e = d == null;
  if (e) {
    $( undefined );
    $( undefined );
  }
  else {
    const f = d.x;
    $( f );
    $( f );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpNestedComplexRhs = tmpChainElementObject;
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
