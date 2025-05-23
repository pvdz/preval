# Preval test case

# assign_logical_and_eq_null.md

> Logical > Compound > Ident > Assign > Assign logical and eq null
>
>

## Input

`````js filename=intro
let x = $('old');
let b = $(null);
if ($(true)) x = b &&= $('b');
$(x, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`old`);
const b /*:unknown*/ = $(null);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  if (b) {
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(`b`);
    $(tmpClusterSSA_tmpNestedComplexRhs, tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    $(b, b);
  }
} else {
  $(x, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`old`);
const b = $(null);
if ($(true)) {
  if (b) {
    const tmpClusterSSA_tmpNestedComplexRhs = $(`b`);
    $(tmpClusterSSA_tmpNestedComplexRhs, tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    $(b, b);
  }
} else {
  $(x, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "old" );
const b = $( null );
const c = $( true );
if (c) {
  if (b) {
    const d = $( "b" );
    $( d, d );
  }
  else {
    $( b, b );
  }
}
else {
  $( a, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`old`);
let b = $(null);
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpNestedCompoundLhs = b;
  let tmpNestedComplexRhs = tmpNestedCompoundLhs;
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $(`b`);
  } else {
  }
  b = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs, b);
} else {
  $(x, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'old'
 - 2: null
 - 3: true
 - 4: null, null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
