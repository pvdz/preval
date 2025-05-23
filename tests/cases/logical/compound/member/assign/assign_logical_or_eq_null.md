# Preval test case

# assign_logical_or_eq_null.md

> Logical > Compound > Member > Assign > Assign logical or eq null
>
>

## Input

`````js filename=intro
let x = $('old');
let b = $({c: null});
if ($(true)) x = b.c ||= $('b');
$(x, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`old`);
const tmpCalleeParam /*:object*/ = { c: null };
const b /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  let tmpNestedPropCompoundComplexRhs /*:unknown*/ = b.c;
  if (tmpNestedPropCompoundComplexRhs) {
  } else {
    tmpNestedPropCompoundComplexRhs = $(`b`);
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
const b = $({ c: null });
if ($(true)) {
  let tmpNestedPropCompoundComplexRhs = b.c;
  if (!tmpNestedPropCompoundComplexRhs) {
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
const b = { c: null };
const c = $( b );
const d = $( true );
if (d) {
  let e = c.c;
  if (e) {

  }
  else {
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
let tmpCalleeParam = { c: null };
let b = $(tmpCalleeParam);
const tmpIfTest = $(true);
if (tmpIfTest) {
  let tmpNestedPropCompoundComplexRhs = b.c;
  if (tmpNestedPropCompoundComplexRhs) {
  } else {
    tmpNestedPropCompoundComplexRhs = $(`b`);
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
 - 2: { c: 'null' }
 - 3: true
 - 4: 'b'
 - 5: 'b', { c: '"b"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
