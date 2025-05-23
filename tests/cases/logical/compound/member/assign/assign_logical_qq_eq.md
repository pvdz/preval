# Preval test case

# assign_logical_qq_eq.md

> Logical > Compound > Member > Assign > Assign logical qq eq
>
>

## Input

`````js filename=intro
let x = $('old');
let b = $({c: 1});
if ($(true)) x = b.c &&= $('b');
$(x, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`old`);
const tmpCalleeParam /*:object*/ = { c: 1 };
const b /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  let tmpNestedPropCompoundComplexRhs /*:unknown*/ = b.c;
  if (tmpNestedPropCompoundComplexRhs) {
    tmpNestedPropCompoundComplexRhs = $(`b`);
  } else {
  }
  b.c = tmpNestedPropCompoundComplexRhs;
  $(tmpNestedPropCompoundComplexRhs, b);
} else {
  $(x, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`old`);
const b = $({ c: 1 });
if ($(true)) {
  let tmpNestedPropCompoundComplexRhs = b.c;
  if (tmpNestedPropCompoundComplexRhs) {
    tmpNestedPropCompoundComplexRhs = $(`b`);
  }
  b.c = tmpNestedPropCompoundComplexRhs;
  $(tmpNestedPropCompoundComplexRhs, b);
} else {
  $(x, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "old" );
const b = { c: 1 };
const c = $( b );
const d = $( true );
if (d) {
  let e = c.c;
  if (e) {
    e = $( "b" );
  }
  c.c = e;
  $( e, c );
}
else {
  $( a, c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`old`);
let tmpCalleeParam = { c: 1 };
let b = $(tmpCalleeParam);
const tmpIfTest = $(true);
if (tmpIfTest) {
  let tmpNestedPropCompoundComplexRhs = b.c;
  if (tmpNestedPropCompoundComplexRhs) {
    tmpNestedPropCompoundComplexRhs = $(`b`);
  } else {
  }
  b.c = tmpNestedPropCompoundComplexRhs;
  x = tmpNestedPropCompoundComplexRhs;
  $(tmpNestedPropCompoundComplexRhs, b);
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
 - 2: { c: '1' }
 - 3: true
 - 4: 'b'
 - 5: 'b', { c: '"b"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
