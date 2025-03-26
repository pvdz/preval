# Preval test case

# let_alias.md

> Tofix > let alias
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
  const alias /*:unknown*/ = tmp;
  $(tmp);
  $(alias);
} else {
  $(tmpCalleeParam);
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
const tmpCalleeParam = a;
if (a) {
  let tmp = $($(0));
  if (!tmp) {
    tmp = $($(1));
    if (!tmp) {
      tmp = $($(2));
    }
  }
  const alias = tmp;
  $(tmp);
  $(alias);
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
const e = b;
if (b) {
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    const h = $( 1 );
    g = $( h );
    if (g) {

    }
    else {
      const i = $( 2 );
      g = $( i );
    }
  }
  const j = g;
  $( g );
  $( j );
}
else {
  $( e );
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
