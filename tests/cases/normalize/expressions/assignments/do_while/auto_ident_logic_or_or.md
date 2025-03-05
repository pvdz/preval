# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || $($(1)) || $($(2)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
    } else {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    }
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
loopStop: {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$4);
    if (tmpClusterSSA_a$4) {
    } else {
      const tmpCalleeParam$6 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$5 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$3) {
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$7);
    if (tmpClusterSSA_a$5) {
    } else {
      const tmpCalleeParam$9 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$8 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$10 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$10);
    if (tmpClusterSSA_a$8) {
    } else {
      const tmpCalleeParam$12 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$7) {
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$13);
    if (tmpClusterSSA_a$9) {
    } else {
      const tmpCalleeParam$15 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$12 /*:unknown*/ = $(tmpCalleeParam$16);
    if (tmpClusterSSA_a$12) {
    } else {
      const tmpCalleeParam$18 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$17 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$11) {
  } else {
    const tmpCalleeParam$19 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$13 /*:unknown*/ = $(tmpCalleeParam$19);
    if (tmpClusterSSA_a$13) {
    } else {
      const tmpCalleeParam$21 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$20 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$14 /*:unknown*/ = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$14) {
  } else {
    const tmpCalleeParam$22 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$16 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$16) {
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$23 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$15 /*:unknown*/ = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$15) {
  } else {
    const tmpCalleeParam$25 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$17 /*:unknown*/ = $(tmpCalleeParam$25);
    if (tmpClusterSSA_a$17) {
    } else {
      const tmpCalleeParam$27 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$26 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$18 /*:unknown*/ = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$18) {
  } else {
    const tmpCalleeParam$28 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$20 /*:unknown*/ = $(tmpCalleeParam$28);
    if (tmpClusterSSA_a$20) {
    } else {
      const tmpCalleeParam$30 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$29 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$19 /*:unknown*/ = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$19) {
  } else {
    const tmpCalleeParam$31 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$21 /*:unknown*/ = $(tmpCalleeParam$31);
    if (tmpClusterSSA_a$21) {
    } else {
      const tmpCalleeParam$33 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$22 /*:unknown*/ = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$22) {
    } else {
      const tmpCalleeParam$34 /*:unknown*/ = $(1);
      const tmpClusterSSA_a$24 /*:unknown*/ = $(tmpCalleeParam$34);
      if (tmpClusterSSA_a$24) {
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
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
loopStop: {
  $( 100 );
  const b = $( 0 );
  const c = $( b );
  if (c) {

  }
  else {
    const d = $( 1 );
    const e = $( d );
    if (e) {

    }
    else {
      const f = $( 2 );
      a = $( f );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const g = $( 0 );
  const h = $( g );
  if (h) {

  }
  else {
    const i = $( 1 );
    const j = $( i );
    if (j) {

    }
    else {
      const k = $( 2 );
      a = $( k );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const l = $( 0 );
  const m = $( l );
  if (m) {

  }
  else {
    const n = $( 1 );
    const o = $( n );
    if (o) {

    }
    else {
      const p = $( 2 );
      a = $( p );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const q = $( 0 );
  const r = $( q );
  if (r) {

  }
  else {
    const s = $( 1 );
    const t = $( s );
    if (t) {

    }
    else {
      const u = $( 2 );
      a = $( u );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const v = $( 0 );
  const w = $( v );
  if (w) {

  }
  else {
    const x = $( 1 );
    const y = $( x );
    if (y) {

    }
    else {
      const z = $( 2 );
      a = $( z );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const ba = $( 0 );
  const bb = $( ba );
  if (bb) {

  }
  else {
    const bc = $( 1 );
    const bd = $( bc );
    if (bd) {

    }
    else {
      const be = $( 2 );
      a = $( be );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const bf = $( 0 );
  const bg = $( bf );
  if (bg) {

  }
  else {
    const bh = $( 1 );
    const bi = $( bh );
    if (bi) {

    }
    else {
      const bj = $( 2 );
      a = $( bj );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const bk = $( 0 );
  const bl = $( bk );
  if (bl) {

  }
  else {
    const bm = $( 1 );
    const bn = $( bm );
    if (bn) {

    }
    else {
      const bo = $( 2 );
      a = $( bo );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const bp = $( 0 );
  const bq = $( bp );
  if (bq) {

  }
  else {
    const br = $( 1 );
    const bs = $( br );
    if (bs) {

    }
    else {
      const bt = $( 2 );
      a = $( bt );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const bu = $( 0 );
  const bv = $( bu );
  if (bv) {

  }
  else {
    const bw = $( 1 );
    const bx = $( bw );
    if (bx) {

    }
    else {
      const by = $( 2 );
      a = $( by );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  $( 100 );
  const bz = $( 0 );
  const ca = $( bz );
  if (ca) {

  }
  else {
    const cb = $( 1 );
    const cc = $( cb );
    if (cc) {

    }
    else {
      const cd = $( 2 );
      a = $( cd );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const ce = $( 0 );
    const cf = $( ce );
    if (cf) {

    }
    else {
      const cg = $( 1 );
      const ch = $( cg );
      if (ch) {

      }
      else {
        const ci = $( 2 );
        a = $( ci );
        if (a) {

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

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
