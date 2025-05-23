# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > For c > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); ($($(1)) && $($(1))) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      let tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$2);
      if (tmpIfTest$4) {
        const tmpCalleeParam$4 /*:unknown*/ = $(1);
        tmpIfTest$4 = $(tmpCalleeParam$4);
      } else {
      }
      if (tmpIfTest$4) {
      } else {
        const tmpCalleeParam$6 /*:unknown*/ = $(2);
        $(tmpCalleeParam$6);
      }
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpIfTest$1 = $($(1));
  if (tmpIfTest$1) {
    tmpIfTest$1 = $($(1));
  }
  if (!tmpIfTest$1) {
    $($(2));
  }
  while (true) {
    if ($(1)) {
      let tmpIfTest$4 = $($(1));
      if (tmpIfTest$4) {
        tmpIfTest$4 = $($(1));
      }
      if (!tmpIfTest$4) {
        $($(2));
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {

  }
  else {
    const e = $( 2 );
    $( e );
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( 1 );
      let h = $( g );
      if (h) {
        const i = $( 1 );
        h = $( i );
      }
      if (h) {

      }
      else {
        const j = $( 2 );
        $( j );
      }
    }
    else {
      break;
    }
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let tmpCalleeParam = $(1);
    let tmpIfTest$1 = $(tmpCalleeParam);
    if (tmpIfTest$1) {
      let tmpCalleeParam$1 = $(1);
      tmpIfTest$1 = $(tmpCalleeParam$1);
    } else {
    }
    if (tmpIfTest$1) {
    } else {
      let tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    }
  } else {
    break;
  }
}
$(a);
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
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
