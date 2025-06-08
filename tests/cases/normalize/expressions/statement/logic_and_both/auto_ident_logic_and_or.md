# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(($($(1)) && $($(1))) || $($(2))) && (($($(1)) && $($(1))) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpIfTest = $(tmpCalleeParam$3);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  let tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpIfTest$1) {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    $(tmpCalleeParam$9);
    $(a);
  }
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $($(1));
if (tmpIfTest) {
  tmpIfTest = $($(1));
}
if (!tmpIfTest) {
  tmpIfTest = $($(2));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  let tmpIfTest$1 = $($(1));
  if (tmpIfTest$1) {
    tmpIfTest$1 = $($(1));
  }
  if (tmpIfTest$1) {
    $(a);
  } else {
    $($(2));
    $(a);
  }
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
const e = {
  a: 999,
  b: 1000,
};
if (b) {
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 1 );
    g = $( h );
  }
  if (g) {
    $( e );
  }
  else {
    const i = $( 2 );
    $( i );
    $( e );
  }
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  let tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpIfTest = $(tmpCalleeParam$3);
}
if (tmpIfTest) {
  let tmpCalleeParam$5 = $(1);
  let tmpIfTest$1 = $(tmpCalleeParam$5);
  if (tmpIfTest$1) {
    let tmpCalleeParam$7 = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpIfTest$1) {
    $(a);
  } else {
    let tmpCalleeParam$9 = $(2);
    $(tmpCalleeParam$9);
    $(a);
  }
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
