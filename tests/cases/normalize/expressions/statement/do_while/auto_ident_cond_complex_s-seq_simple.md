# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(1) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
loopStop: {
  $(100);
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$2 /*:unknown*/ = $(1);
  if (tmpIfTest$2) {
    $(100);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$3 /*:unknown*/ = $(1);
  if (tmpIfTest$3) {
    $(100);
  } else {
    const tmpCalleeParam$2 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$2);
    if (tmpClusterSSA_tmpIfTest$2) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$4 /*:unknown*/ = $(1);
  if (tmpIfTest$4) {
    $(100);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$3) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$5 /*:unknown*/ = $(1);
  if (tmpIfTest$5) {
    $(100);
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$4) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$6 /*:unknown*/ = $(1);
  if (tmpIfTest$6) {
    $(100);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$5);
    if (tmpClusterSSA_tmpIfTest$5) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$7 /*:unknown*/ = $(1);
  if (tmpIfTest$7) {
    $(100);
  } else {
    const tmpCalleeParam$6 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$6 /*:unknown*/ = $(tmpCalleeParam$6);
    if (tmpClusterSSA_tmpIfTest$6) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$8 /*:unknown*/ = $(1);
  if (tmpIfTest$8) {
    $(100);
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$7);
    if (tmpClusterSSA_tmpIfTest$7) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$9 /*:unknown*/ = $(1);
  if (tmpIfTest$9) {
    $(100);
  } else {
    const tmpCalleeParam$8 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$8 /*:unknown*/ = $(tmpCalleeParam$8);
    if (tmpClusterSSA_tmpIfTest$8) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$10 /*:unknown*/ = $(1);
  if (tmpIfTest$10) {
    $(100);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$9 /*:unknown*/ = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpIfTest$9) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpIfTest$11 /*:unknown*/ = $(1);
  if (tmpIfTest$11) {
  } else {
    const tmpCalleeParam$10 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpIfTest$10 /*:unknown*/ = $(tmpCalleeParam$10);
    if (tmpClusterSSA_tmpIfTest$10) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpIfTest$12 /*:unknown*/ = $(1);
    if (tmpIfTest$12) {
    } else {
      const tmpCalleeParam$11 /*:unknown*/ = $(100);
      const tmpClusterSSA_tmpIfTest$11 /*:unknown*/ = $(tmpCalleeParam$11);
      if (tmpClusterSSA_tmpIfTest$11) {
      } else {
        break;
      }
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
loopStop: {
  $(100);
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($(1)) {
    $(100);
  } else {
    if ($($(100))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if (!$(1)) {
    if (!$($(100))) {
      break loopStop;
    }
  }
  while (true) {
    $(100);
    if (!$(1)) {
      if (!$($(100))) {
        break;
      }
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
loopStop: {
  $( 100 );
  const a = $( 1 );
  if (a) {
    $( 100 );
  }
  else {
    const b = $( 100 );
    const c = $( b );
    if (c) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const d = $( 1 );
  if (d) {
    $( 100 );
  }
  else {
    const e = $( 100 );
    const f = $( e );
    if (f) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const g = $( 1 );
  if (g) {
    $( 100 );
  }
  else {
    const h = $( 100 );
    const i = $( h );
    if (i) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const j = $( 1 );
  if (j) {
    $( 100 );
  }
  else {
    const k = $( 100 );
    const l = $( k );
    if (l) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const m = $( 1 );
  if (m) {
    $( 100 );
  }
  else {
    const n = $( 100 );
    const o = $( n );
    if (o) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const p = $( 1 );
  if (p) {
    $( 100 );
  }
  else {
    const q = $( 100 );
    const r = $( q );
    if (r) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const s = $( 1 );
  if (s) {
    $( 100 );
  }
  else {
    const t = $( 100 );
    const u = $( t );
    if (u) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const v = $( 1 );
  if (v) {
    $( 100 );
  }
  else {
    const w = $( 100 );
    const x = $( w );
    if (x) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const y = $( 1 );
  if (y) {
    $( 100 );
  }
  else {
    const z = $( 100 );
    const ba = $( z );
    if (ba) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bb = $( 1 );
  if (bb) {
    $( 100 );
  }
  else {
    const bc = $( 100 );
    const bd = $( bc );
    if (bd) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const be = $( 1 );
  if (be) {

  }
  else {
    const bf = $( 100 );
    const bg = $( bf );
    if (bg) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const bh = $( 1 );
    if (bh) {

    }
    else {
      const bi = $( 100 );
      const bj = $( bi );
      if (bj) {

      }
      else {
        break;
      }
    }
  }
}
const bk = {
  a: 999,
  b: 1000,
};
$( bk );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = 60;
  } else {
    let tmpCalleeParam = $(100);
    tmpIfTest = $(tmpCalleeParam);
  }
  if (tmpIfTest) {
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
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
