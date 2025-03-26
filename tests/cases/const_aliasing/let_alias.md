# Preval test case

# let_alias.md

> Const aliasing > Let alias
>
> When the let is not a closure, and the let cannot change, then it's an alias anyways

## Input

`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  }
}
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  let tmp /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmp) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    tmp = $(tmpCalleeParam$9);
    if (tmp) {
    } else {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      tmp = $(tmpCalleeParam$11);
    }
  }
  const alias /*:unknown*/ = tmp;  // <-- this is an alias because tmp cannot change before using alias 
  $(tmp);
  $(alias);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  }
}
if (a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmp /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmp) {
    $(tmp);
    $(tmp);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmp /*:unknown*/ = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmp) {
      $(tmpClusterSSA_tmp);
      $(tmpClusterSSA_tmp);
    } else {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmp$1 /*:unknown*/ = $(tmpCalleeParam$11);
      $(tmpClusterSSA_tmp$1);
      $(tmpClusterSSA_tmp$1);
    }
  }
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (!a) {
    a = $($(2));
  }
}
if (a) {
  const tmp = $($(0));
  if (tmp) {
    $(tmp);
    $(tmp);
  } else {
    const tmpClusterSSA_tmp = $($(1));
    if (tmpClusterSSA_tmp) {
      $(tmpClusterSSA_tmp);
      $(tmpClusterSSA_tmp);
    } else {
      const tmpClusterSSA_tmp$1 = $($(2));
      $(tmpClusterSSA_tmp$1);
      $(tmpClusterSSA_tmp$1);
    }
  }
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( f );
    $( f );
  }
  else {
    const g = $( 1 );
    const h = $( g );
    if (h) {
      $( h );
      $( h );
    }
    else {
      const i = $( 2 );
      const j = $( i );
      $( j );
      $( j );
    }
  }
}
else {
  $( b );
  $( b );
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
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
