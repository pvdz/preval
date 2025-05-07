# Preval test case

# assign_logical_or_eq_null.md

> Logical > Compound > Ident > Assign > Assign logical or eq null
>
>

## Input

`````js filename=intro
let x = $('old');
let b = $(null);
if ($(true)) x = b ||= $('b');
$(x, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`old`);
const b /*:unknown*/ = $(null);
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
const b = $(null);
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
const b = $( null );
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
 - 2: null
 - 3: true
 - 4: 'b'
 - 5: 'b', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
