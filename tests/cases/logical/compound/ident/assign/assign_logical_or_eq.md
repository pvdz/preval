# Preval test case

# assign_logical_or_eq.md

> Logical > Compound > Ident > Assign > Assign logical or eq
>
>

## Input

`````js filename=intro
let x = $('old');
let b = $(1);
if ($(true)) x = b ||= $('b');
$(x, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`old`);
const b /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  if (b) {
    $(b, b);
  } else {
    const tmpNestedComplexRhs /*:unknown*/ = $(`b`);
    $(tmpNestedComplexRhs, tmpNestedComplexRhs);
  }
} else {
  $(x, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`old`);
const b = $(1);
if ($(true)) {
  if (b) {
    $(b, b);
  } else {
    const tmpNestedComplexRhs = $(`b`);
    $(tmpNestedComplexRhs, tmpNestedComplexRhs);
  }
} else {
  $(x, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "old" );
const b = $( 1 );
const c = $( true );
if (c) {
  if (b) {
    $( b, b );
  }
  else {
    const d = $( "b" );
    $( d, d );
  }
}
else {
  $( a, b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'old'
 - 2: 1
 - 3: true
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
