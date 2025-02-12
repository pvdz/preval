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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
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
let a = undefined;
loopStop: {
  $(100);
  const tmpCalleeParam = $(0);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_a$1 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
    } else {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$2 = $(0);
  const tmpClusterSSA_a$2 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$4 = $(1);
    const tmpClusterSSA_a$4 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_a$4) {
    } else {
      const tmpCalleeParam$6 = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$5 = $(0);
  const tmpClusterSSA_a$3 = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$3) {
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpClusterSSA_a$5 = $(tmpCalleeParam$7);
    if (tmpClusterSSA_a$5) {
    } else {
      const tmpCalleeParam$9 = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$8 = $(0);
  const tmpClusterSSA_a$6 = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$10 = $(1);
    const tmpClusterSSA_a$8 = $(tmpCalleeParam$10);
    if (tmpClusterSSA_a$8) {
    } else {
      const tmpCalleeParam$12 = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$11 = $(0);
  const tmpClusterSSA_a$7 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$7) {
  } else {
    const tmpCalleeParam$13 = $(1);
    const tmpClusterSSA_a$9 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_a$9) {
    } else {
      const tmpCalleeParam$15 = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$14 = $(0);
  const tmpClusterSSA_a$10 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$16 = $(1);
    const tmpClusterSSA_a$12 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_a$12) {
    } else {
      const tmpCalleeParam$18 = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$17 = $(0);
  const tmpClusterSSA_a$11 = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$11) {
  } else {
    const tmpCalleeParam$19 = $(1);
    const tmpClusterSSA_a$13 = $(tmpCalleeParam$19);
    if (tmpClusterSSA_a$13) {
    } else {
      const tmpCalleeParam$21 = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$20 = $(0);
  const tmpClusterSSA_a$14 = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$14) {
  } else {
    const tmpCalleeParam$22 = $(1);
    const tmpClusterSSA_a$16 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$16) {
    } else {
      const tmpCalleeParam$24 = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$23 = $(0);
  const tmpClusterSSA_a$15 = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$15) {
  } else {
    const tmpCalleeParam$25 = $(1);
    const tmpClusterSSA_a$17 = $(tmpCalleeParam$25);
    if (tmpClusterSSA_a$17) {
    } else {
      const tmpCalleeParam$27 = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$26 = $(0);
  const tmpClusterSSA_a$18 = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$18) {
  } else {
    const tmpCalleeParam$28 = $(1);
    const tmpClusterSSA_a$20 = $(tmpCalleeParam$28);
    if (tmpClusterSSA_a$20) {
    } else {
      const tmpCalleeParam$30 = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  $(100);
  const tmpCalleeParam$29 = $(0);
  const tmpClusterSSA_a$19 = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$19) {
  } else {
    const tmpCalleeParam$31 = $(1);
    const tmpClusterSSA_a$21 = $(tmpCalleeParam$31);
    if (tmpClusterSSA_a$21) {
    } else {
      const tmpCalleeParam$33 = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
      } else {
        break loopStop;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 = $(0);
    const tmpClusterSSA_a$22 = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$22) {
    } else {
      const tmpCalleeParam$34 = $(1);
      const tmpClusterSSA_a$24 = $(tmpCalleeParam$34);
      if (tmpClusterSSA_a$24) {
      } else {
        const tmpCalleeParam$36 = $(2);
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
