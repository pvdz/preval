# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
loopStop: {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpClusterSSA_a = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$3);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$4 /*:unknown*/ = $(1);
    tmpClusterSSA_a$1 = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpClusterSSA_a$1) {
    $(100);
  } else {
    const tmpCalleeParam$6 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$6);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$2) {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpClusterSSA_a$2) {
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
  const tmpCalleeParam$8 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$3) {
    const tmpCalleeParam$10 /*:unknown*/ = $(1);
    tmpClusterSSA_a$3 = $(tmpCalleeParam$10);
  } else {
  }
  if (tmpClusterSSA_a$3) {
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
  const tmpCalleeParam$11 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$4) {
    const tmpCalleeParam$13 /*:unknown*/ = $(1);
    tmpClusterSSA_a$4 = $(tmpCalleeParam$13);
  } else {
  }
  if (tmpClusterSSA_a$4) {
    $(100);
  } else {
    const tmpCalleeParam$15 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$15);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$5) {
    const tmpCalleeParam$16 /*:unknown*/ = $(1);
    tmpClusterSSA_a$5 = $(tmpCalleeParam$16);
  } else {
  }
  if (tmpClusterSSA_a$5) {
    $(100);
  } else {
    const tmpCalleeParam$18 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$18);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$17 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$6) {
    const tmpCalleeParam$19 /*:unknown*/ = $(1);
    tmpClusterSSA_a$6 = $(tmpCalleeParam$19);
  } else {
  }
  if (tmpClusterSSA_a$6) {
    $(100);
  } else {
    const tmpCalleeParam$21 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$20 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$7) {
    const tmpCalleeParam$22 /*:unknown*/ = $(1);
    tmpClusterSSA_a$7 = $(tmpCalleeParam$22);
  } else {
  }
  if (tmpClusterSSA_a$7) {
    $(100);
  } else {
    const tmpCalleeParam$24 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$24);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$23 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$8) {
    const tmpCalleeParam$25 /*:unknown*/ = $(1);
    tmpClusterSSA_a$8 = $(tmpCalleeParam$25);
  } else {
  }
  if (tmpClusterSSA_a$8) {
    $(100);
  } else {
    const tmpCalleeParam$27 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$27);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$26 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$9) {
    const tmpCalleeParam$28 /*:unknown*/ = $(1);
    tmpClusterSSA_a$9 = $(tmpCalleeParam$28);
  } else {
  }
  if (tmpClusterSSA_a$9) {
    $(100);
  } else {
    const tmpCalleeParam$30 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$30);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$29 /*:unknown*/ = $(1);
  let tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$10) {
    const tmpCalleeParam$31 /*:unknown*/ = $(1);
    tmpClusterSSA_a$10 = $(tmpCalleeParam$31);
  } else {
  }
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$33 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$33);
    if (a) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 /*:unknown*/ = $(1);
    let tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$11) {
      const tmpCalleeParam$34 /*:unknown*/ = $(1);
      tmpClusterSSA_a$11 = $(tmpCalleeParam$34);
    } else {
    }
    if (tmpClusterSSA_a$11) {
    } else {
      const tmpCalleeParam$36 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$36);
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
  let tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    tmpClusterSSA_a = $($(1));
  }
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    tmpClusterSSA_a$1 = $($(1));
  }
  if (tmpClusterSSA_a$1) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$2 = $($(1));
  if (tmpClusterSSA_a$2) {
    tmpClusterSSA_a$2 = $($(1));
  }
  if (tmpClusterSSA_a$2) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$3 = $($(1));
  if (tmpClusterSSA_a$3) {
    tmpClusterSSA_a$3 = $($(1));
  }
  if (tmpClusterSSA_a$3) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$4 = $($(1));
  if (tmpClusterSSA_a$4) {
    tmpClusterSSA_a$4 = $($(1));
  }
  if (tmpClusterSSA_a$4) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$5 = $($(1));
  if (tmpClusterSSA_a$5) {
    tmpClusterSSA_a$5 = $($(1));
  }
  if (tmpClusterSSA_a$5) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$6 = $($(1));
  if (tmpClusterSSA_a$6) {
    tmpClusterSSA_a$6 = $($(1));
  }
  if (tmpClusterSSA_a$6) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$7 = $($(1));
  if (tmpClusterSSA_a$7) {
    tmpClusterSSA_a$7 = $($(1));
  }
  if (tmpClusterSSA_a$7) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$8 = $($(1));
  if (tmpClusterSSA_a$8) {
    tmpClusterSSA_a$8 = $($(1));
  }
  if (tmpClusterSSA_a$8) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$9 = $($(1));
  if (tmpClusterSSA_a$9) {
    tmpClusterSSA_a$9 = $($(1));
  }
  if (tmpClusterSSA_a$9) {
    $(100);
  } else {
    a = $($(2));
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  let tmpClusterSSA_a$10 = $($(1));
  if (tmpClusterSSA_a$10) {
    tmpClusterSSA_a$10 = $($(1));
  }
  if (!tmpClusterSSA_a$10) {
    a = $($(2));
    if (!a) {
      break loopStop;
    }
  }
  while (true) {
    $(100);
    let tmpClusterSSA_a$11 = $($(1));
    if (tmpClusterSSA_a$11) {
      tmpClusterSSA_a$11 = $($(1));
    }
    if (!tmpClusterSSA_a$11) {
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
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {
    $( 100 );
  }
  else {
    const e = $( 2 );
    a = $( e );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 1 );
    g = $( h );
  }
  if (g) {
    $( 100 );
  }
  else {
    const i = $( 2 );
    a = $( i );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const j = $( 1 );
  let k = $( j );
  if (k) {
    const l = $( 1 );
    k = $( l );
  }
  if (k) {
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
  const n = $( 1 );
  let o = $( n );
  if (o) {
    const p = $( 1 );
    o = $( p );
  }
  if (o) {
    $( 100 );
  }
  else {
    const q = $( 2 );
    a = $( q );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const r = $( 1 );
  let s = $( r );
  if (s) {
    const t = $( 1 );
    s = $( t );
  }
  if (s) {
    $( 100 );
  }
  else {
    const u = $( 2 );
    a = $( u );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const v = $( 1 );
  let w = $( v );
  if (w) {
    const x = $( 1 );
    w = $( x );
  }
  if (w) {
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
  const z = $( 1 );
  let ba = $( z );
  if (ba) {
    const bb = $( 1 );
    ba = $( bb );
  }
  if (ba) {
    $( 100 );
  }
  else {
    const bc = $( 2 );
    a = $( bc );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bd = $( 1 );
  let be = $( bd );
  if (be) {
    const bf = $( 1 );
    be = $( bf );
  }
  if (be) {
    $( 100 );
  }
  else {
    const bg = $( 2 );
    a = $( bg );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bh = $( 1 );
  let bi = $( bh );
  if (bi) {
    const bj = $( 1 );
    bi = $( bj );
  }
  if (bi) {
    $( 100 );
  }
  else {
    const bk = $( 2 );
    a = $( bk );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bl = $( 1 );
  let bm = $( bl );
  if (bm) {
    const bn = $( 1 );
    bm = $( bn );
  }
  if (bm) {
    $( 100 );
  }
  else {
    const bo = $( 2 );
    a = $( bo );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  const bp = $( 1 );
  let bq = $( bp );
  if (bq) {
    const br = $( 1 );
    bq = $( br );
  }
  if (bq) {

  }
  else {
    const bs = $( 2 );
    a = $( bs );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const bt = $( 1 );
    let bu = $( bt );
    if (bu) {
      const bv = $( 1 );
      bu = $( bv );
    }
    if (bu) {

    }
    else {
      const bw = $( 2 );
      a = $( bw );
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
  let tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  } else {
  }
  if (a) {
  } else {
    let tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
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
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
