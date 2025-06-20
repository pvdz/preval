# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) || (a = $($(0)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpCalleeParam /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(0);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpCalleeParam = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  a = $($(2));
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpNestedComplexRhs = $($(0));
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(2));
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
if (b) {
  $( c );
  $( b );
}
else {
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( f );
    $( f );
  }
  else {
    const g = $( 2 );
    const h = $( g );
    $( h );
    $( h );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  let tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpCalleeParam$5 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
  } else {
    let tmpCalleeParam$7 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$7);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
