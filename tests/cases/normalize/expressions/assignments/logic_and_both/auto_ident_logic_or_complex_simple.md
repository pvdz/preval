# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) && (a = $($(0)) || 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpCalleeParam /*:unknown*/ = 2;
if (a) {
  tmpCalleeParam = a;
} else {
  a = 2;
}
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    $(2);
    $(2);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpCalleeParam = 2;
if (a) {
  tmpCalleeParam = a;
} else {
  a = 2;
}
if (a) {
  const tmpNestedComplexRhs = $($(0));
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    $(2);
    $(2);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = 2;
if (b) {
  c = b;
}
else {
  b = 2;
}
if (b) {
  const d = $( 0 );
  const e = $( d );
  if (e) {
    $( e );
    $( e );
  }
  else {
    $( 2 );
    $( 2 );
  }
}
else {
  $( c );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
