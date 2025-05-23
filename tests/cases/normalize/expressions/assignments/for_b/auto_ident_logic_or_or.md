# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || $($(1)) || $($(2))); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
loopStop: {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(1);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
      $(1);
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$2) {
    $(1);
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$4);
    if (tmpClusterSSA_a$4) {
      $(1);
    } else {
      const tmpCalleeParam$6 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$5 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$3) {
    $(1);
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$7);
    if (tmpClusterSSA_a$5) {
      $(1);
    } else {
      const tmpCalleeParam$9 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$8 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$6) {
    $(1);
  } else {
    const tmpCalleeParam$10 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$10);
    if (tmpClusterSSA_a$8) {
      $(1);
    } else {
      const tmpCalleeParam$12 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$7) {
    $(1);
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$13);
    if (tmpClusterSSA_a$9) {
      $(1);
    } else {
      const tmpCalleeParam$15 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$10) {
    $(1);
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$12 /*:unknown*/ = $(tmpCalleeParam$16);
    if (tmpClusterSSA_a$12) {
      $(1);
    } else {
      const tmpCalleeParam$18 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$17 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$11) {
    $(1);
  } else {
    const tmpCalleeParam$19 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$13 /*:unknown*/ = $(tmpCalleeParam$19);
    if (tmpClusterSSA_a$13) {
      $(1);
    } else {
      const tmpCalleeParam$21 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$20 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$14 /*:unknown*/ = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$14) {
    $(1);
  } else {
    const tmpCalleeParam$22 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$16 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$16) {
      $(1);
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$23 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$15 /*:unknown*/ = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$15) {
    $(1);
  } else {
    const tmpCalleeParam$25 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$17 /*:unknown*/ = $(tmpCalleeParam$25);
    if (tmpClusterSSA_a$17) {
      $(1);
    } else {
      const tmpCalleeParam$27 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$26 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$18 /*:unknown*/ = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$18) {
    $(1);
  } else {
    const tmpCalleeParam$28 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$20 /*:unknown*/ = $(tmpCalleeParam$28);
    if (tmpClusterSSA_a$20) {
      $(1);
    } else {
      const tmpCalleeParam$30 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  const tmpCalleeParam$29 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$19 /*:unknown*/ = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$19) {
    $(1);
  } else {
    const tmpCalleeParam$31 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$21 /*:unknown*/ = $(tmpCalleeParam$31);
    if (tmpClusterSSA_a$21) {
      $(1);
    } else {
      const tmpCalleeParam$33 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$32 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$22 /*:unknown*/ = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$22) {
      $(1);
    } else {
      const tmpCalleeParam$34 /*:unknown*/ = $(1);
      const tmpClusterSSA_a$24 /*:unknown*/ = $(tmpCalleeParam$34);
      if (tmpClusterSSA_a$24) {
        $(1);
      } else {
        const tmpCalleeParam$36 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$36);
        if (a) {
          $(1);
        } else {
          break;
        }
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
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  if ($($(0))) {
    $(1);
  } else {
    if ($($(1))) {
      $(1);
    } else {
      a = $($(2));
      if (a) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  while (true) {
    if ($($(0))) {
      $(1);
    } else {
      if ($($(1))) {
        $(1);
      } else {
        a = $($(2));
        if (a) {
          $(1);
        } else {
          break;
        }
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
  const b = $( 0 );
  const c = $( b );
  if (c) {
    $( 1 );
  }
  else {
    const d = $( 1 );
    const e = $( d );
    if (e) {
      $( 1 );
    }
    else {
      const f = $( 2 );
      a = $( f );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const g = $( 0 );
  const h = $( g );
  if (h) {
    $( 1 );
  }
  else {
    const i = $( 1 );
    const j = $( i );
    if (j) {
      $( 1 );
    }
    else {
      const k = $( 2 );
      a = $( k );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const l = $( 0 );
  const m = $( l );
  if (m) {
    $( 1 );
  }
  else {
    const n = $( 1 );
    const o = $( n );
    if (o) {
      $( 1 );
    }
    else {
      const p = $( 2 );
      a = $( p );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const q = $( 0 );
  const r = $( q );
  if (r) {
    $( 1 );
  }
  else {
    const s = $( 1 );
    const t = $( s );
    if (t) {
      $( 1 );
    }
    else {
      const u = $( 2 );
      a = $( u );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const v = $( 0 );
  const w = $( v );
  if (w) {
    $( 1 );
  }
  else {
    const x = $( 1 );
    const y = $( x );
    if (y) {
      $( 1 );
    }
    else {
      const z = $( 2 );
      a = $( z );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const ba = $( 0 );
  const bb = $( ba );
  if (bb) {
    $( 1 );
  }
  else {
    const bc = $( 1 );
    const bd = $( bc );
    if (bd) {
      $( 1 );
    }
    else {
      const be = $( 2 );
      a = $( be );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const bf = $( 0 );
  const bg = $( bf );
  if (bg) {
    $( 1 );
  }
  else {
    const bh = $( 1 );
    const bi = $( bh );
    if (bi) {
      $( 1 );
    }
    else {
      const bj = $( 2 );
      a = $( bj );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const bk = $( 0 );
  const bl = $( bk );
  if (bl) {
    $( 1 );
  }
  else {
    const bm = $( 1 );
    const bn = $( bm );
    if (bn) {
      $( 1 );
    }
    else {
      const bo = $( 2 );
      a = $( bo );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const bp = $( 0 );
  const bq = $( bp );
  if (bq) {
    $( 1 );
  }
  else {
    const br = $( 1 );
    const bs = $( br );
    if (bs) {
      $( 1 );
    }
    else {
      const bt = $( 2 );
      a = $( bt );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const bu = $( 0 );
  const bv = $( bu );
  if (bv) {
    $( 1 );
  }
  else {
    const bw = $( 1 );
    const bx = $( bw );
    if (bx) {
      $( 1 );
    }
    else {
      const by = $( 2 );
      a = $( by );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  const bz = $( 0 );
  const ca = $( bz );
  if (ca) {
    $( 1 );
  }
  else {
    const cb = $( 1 );
    const cc = $( cb );
    if (cc) {
      $( 1 );
    }
    else {
      const cd = $( 2 );
      a = $( cd );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const ce = $( 0 );
    const cf = $( ce );
    if (cf) {
      $( 1 );
    }
    else {
      const cg = $( 1 );
      const ch = $( cg );
      if (ch) {
        $( 1 );
      }
      else {
        const ci = $( 2 );
        a = $( ci );
        if (a) {
          $( 1 );
        }
        else {
          break;
        }
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
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
    } else {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    }
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
