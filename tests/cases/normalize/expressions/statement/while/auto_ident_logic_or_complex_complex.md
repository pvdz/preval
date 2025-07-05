# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(2))) $(100);
$(a);
`````


## Settled


`````js filename=intro
loopStop: {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpIfTest$2) {
    $(100);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$5);
    if (tmpClusterSSA_tmpIfTest$2) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$6 /*:unknown*/ = $(0);
  const tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$6);
  if (tmpIfTest$3) {
    $(100);
  } else {
    const tmpCalleeParam$8 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$8);
    if (tmpClusterSSA_tmpIfTest$3) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpIfTest$4) {
    $(100);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpIfTest$4) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$10 /*:unknown*/ = $(0);
  const tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$10);
  if (tmpIfTest$5) {
    $(100);
  } else {
    const tmpCalleeParam$12 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$12);
    if (tmpClusterSSA_tmpIfTest$5) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpIfTest$6 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpIfTest$6) {
    $(100);
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$6 /*:unknown*/ = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$6) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpIfTest$7) {
    $(100);
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$7) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$15 /*:unknown*/ = $(0);
  const tmpIfTest$8 /*:unknown*/ = $(tmpCalleeParam$15);
  if (tmpIfTest$8) {
    $(100);
  } else {
    const tmpCalleeParam$17 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$8 /*:unknown*/ = $(tmpCalleeParam$17);
    if (tmpClusterSSA_tmpIfTest$8) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$18 /*:unknown*/ = $(0);
  const tmpIfTest$9 /*:unknown*/ = $(tmpCalleeParam$18);
  if (tmpIfTest$9) {
    $(100);
  } else {
    const tmpCalleeParam$20 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$9 /*:unknown*/ = $(tmpCalleeParam$20);
    if (tmpClusterSSA_tmpIfTest$9) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$19 /*:unknown*/ = $(0);
  const tmpIfTest$10 /*:unknown*/ = $(tmpCalleeParam$19);
  if (tmpIfTest$10) {
    $(100);
  } else {
    const tmpCalleeParam$21 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$10 /*:unknown*/ = $(tmpCalleeParam$21);
    if (tmpClusterSSA_tmpIfTest$10) {
      $(100);
    } else {
      break loopStop;
    }
  }
  while ($LOOP_NO_UNROLLS_LEFT) {
    const tmpCalleeParam$22 /*:unknown*/ = $(0);
    const tmpIfTest$11 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpIfTest$11) {
      $(100);
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmpIfTest$11 /*:unknown*/ = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$11) {
        $(100);
      } else {
        break;
      }
    }
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
loopStop: {
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    if ($($(2))) {
      $(100);
    } else {
      break loopStop;
    }
  }
  while (true) {
    if ($($(0))) {
      $(100);
    } else {
      if ($($(2))) {
        $(100);
      } else {
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
  const a = $( 0 );
  const b = $( a );
  if (b) {
    $( 100 );
  }
  else {
    const c = $( 2 );
    const d = $( c );
    if (d) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( 100 );
  }
  else {
    const g = $( 2 );
    const h = $( g );
    if (h) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const i = $( 0 );
  const j = $( i );
  if (j) {
    $( 100 );
  }
  else {
    const k = $( 2 );
    const l = $( k );
    if (l) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const m = $( 0 );
  const n = $( m );
  if (n) {
    $( 100 );
  }
  else {
    const o = $( 2 );
    const p = $( o );
    if (p) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const q = $( 0 );
  const r = $( q );
  if (r) {
    $( 100 );
  }
  else {
    const s = $( 2 );
    const t = $( s );
    if (t) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const u = $( 0 );
  const v = $( u );
  if (v) {
    $( 100 );
  }
  else {
    const w = $( 2 );
    const x = $( w );
    if (x) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const y = $( 0 );
  const z = $( y );
  if (z) {
    $( 100 );
  }
  else {
    const ba = $( 2 );
    const bb = $( ba );
    if (bb) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bc = $( 0 );
  const bd = $( bc );
  if (bd) {
    $( 100 );
  }
  else {
    const be = $( 2 );
    const bf = $( be );
    if (bf) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bg = $( 0 );
  const bh = $( bg );
  if (bh) {
    $( 100 );
  }
  else {
    const bi = $( 2 );
    const bj = $( bi );
    if (bj) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bk = $( 0 );
  const bl = $( bk );
  if (bl) {
    $( 100 );
  }
  else {
    const bm = $( 2 );
    const bn = $( bm );
    if (bn) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bo = $( 0 );
  const bp = $( bo );
  if (bp) {
    $( 100 );
  }
  else {
    const bq = $( 2 );
    const br = $( bq );
    if (br) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_NO_UNROLLS_LEFT) {
    const bs = $( 0 );
    const bt = $( bs );
    if (bt) {
      $( 100 );
    }
    else {
      const bu = $( 2 );
      const bv = $( bu );
      if (bv) {
        $( 100 );
      }
      else {
        break;
      }
    }
  }
}
const bw = {
  a: 999,
  b: 1000,
};
$( bw );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpCalleeParam = $(0);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    let tmpCalleeParam$1 = $(2);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(100);
    } else {
      break;
    }
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
