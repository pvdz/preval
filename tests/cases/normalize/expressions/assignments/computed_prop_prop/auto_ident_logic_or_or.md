# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || $($(1)) || $($(2)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $coerce(a, `string`);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    $coerce(tmpClusterSSA_a, `string`);
    $(tmpClusterSSA_a);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $coerce(tmpClusterSSA_a$1, `string`);
    $(tmpClusterSSA_a$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $coerce(a, `string`);
  $(a);
} else {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $coerce(tmpClusterSSA_a, `string`);
    $(tmpClusterSSA_a);
  } else {
    const tmpClusterSSA_a$1 = $($(2));
    $coerce(tmpClusterSSA_a$1, `string`);
    $(tmpClusterSSA_a$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $coerce( b, "string" );
  $( b );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $coerce( d, "string" );
    $( d );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $coerce( f, "string" );
    $( f );
  }
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
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
