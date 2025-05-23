# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || ($($(1)) && $($(2))))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $coerce(a, `string`);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$5);
    $coerce(tmpClusterSSA_a$1, `string`);
    $(tmpClusterSSA_a$1);
  } else {
    $coerce(tmpClusterSSA_a, `string`);
    $(tmpClusterSSA_a);
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
    const tmpClusterSSA_a$1 = $($(2));
    $coerce(tmpClusterSSA_a$1, `string`);
    $(tmpClusterSSA_a$1);
  } else {
    $coerce(tmpClusterSSA_a, `string`);
    $(tmpClusterSSA_a);
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
    const e = $( 2 );
    const f = $( e );
    $coerce( f, "string" );
    $( f );
  }
  else {
    $coerce( d, "string" );
    $( d );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  let tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    let tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpCalleeParam = a;
tmpCompObj[tmpCalleeParam];
$(a);
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
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
