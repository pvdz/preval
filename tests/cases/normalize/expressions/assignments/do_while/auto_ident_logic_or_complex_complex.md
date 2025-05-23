# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
loopStop: {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$4);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a$2) {
    $(100);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$6 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$6);
  if (tmpClusterSSA_a$3) {
    $(100);
  } else {
    const tmpCalleeParam$8 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$8);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpClusterSSA_a$4) {
    $(100);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$9);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$10 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$10);
  if (tmpClusterSSA_a$5) {
    $(100);
  } else {
    const tmpCalleeParam$12 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$12);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$6) {
    $(100);
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$13);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$7) {
    $(100);
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$16);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$15 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$15);
  if (tmpClusterSSA_a$8) {
    $(100);
  } else {
    const tmpCalleeParam$17 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$17);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$18 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$18);
  if (tmpClusterSSA_a$9) {
    $(100);
  } else {
    const tmpCalleeParam$20 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$20);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$19 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$19);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$21 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$22 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$11) {
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
      } else {
        break;
      }
    }
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
loopStop: {
  $(100);
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if ($($(0))) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  if (!$($(0))) {
    a = $($(2));
    if (!a) {
      break loopStop;
    }
  }
  while (true) {
    $(100);
    if (!$($(0))) {
      a = $($(2));
      if (!a) {
        break;
      }
    }
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
loopStop: {
  $( 100 );
  const b = $( 0 );
  const c = $( b );
  if (c) {
    $( 100 );
  }
  else {
    const d = $( 2 );
    a = $( d );
    if (a) {
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
    a = $( g );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const h = $( 0 );
  const i = $( h );
  if (i) {
    $( 100 );
  }
  else {
    const j = $( 2 );
    a = $( j );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const k = $( 0 );
  const l = $( k );
  if (l) {
    $( 100 );
  }
  else {
    const m = $( 2 );
    a = $( m );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const n = $( 0 );
  const o = $( n );
  if (o) {
    $( 100 );
  }
  else {
    const p = $( 2 );
    a = $( p );
    if (a) {
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
    a = $( s );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const t = $( 0 );
  const u = $( t );
  if (u) {
    $( 100 );
  }
  else {
    const v = $( 2 );
    a = $( v );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const w = $( 0 );
  const x = $( w );
  if (x) {
    $( 100 );
  }
  else {
    const y = $( 2 );
    a = $( y );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const z = $( 0 );
  const ba = $( z );
  if (ba) {
    $( 100 );
  }
  else {
    const bb = $( 2 );
    a = $( bb );
    if (a) {
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
    a = $( be );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bf = $( 0 );
  const bg = $( bf );
  if (bg) {

  }
  else {
    const bh = $( 2 );
    a = $( bh );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const bi = $( 0 );
    const bj = $( bi );
    if (bj) {

    }
    else {
      const bk = $( 2 );
      a = $( bk );
      if (a) {

      }
      else {
        break;
      }
    }
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    let tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
