# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(0)) || ($($(1)) && $($(2)))) {
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
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      if (tmpIfTest) {
      } else {
        break;
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
loopStop: {
  $(100);
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCalleeParam$3 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
      if (tmpClusterSSA_tmpIfTest$1) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$2 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$4 = $(1);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$2) {
      const tmpCalleeParam$6 = $(2);
      const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$6);
      if (tmpClusterSSA_tmpIfTest$4) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$5 = $(0);
  const tmpIfTest$2 = $(tmpCalleeParam$5);
  if (tmpIfTest$2) {
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$7);
    if (tmpClusterSSA_tmpIfTest$3) {
      const tmpCalleeParam$9 = $(2);
      const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$9);
      if (tmpClusterSSA_tmpIfTest$5) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$8 = $(0);
  const tmpIfTest$3 = $(tmpCalleeParam$8);
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$10 = $(1);
    const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$10);
    if (tmpClusterSSA_tmpIfTest$6) {
      const tmpCalleeParam$12 = $(2);
      const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$12);
      if (tmpClusterSSA_tmpIfTest$8) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$11 = $(0);
  const tmpIfTest$4 = $(tmpCalleeParam$11);
  if (tmpIfTest$4) {
  } else {
    const tmpCalleeParam$13 = $(1);
    const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$7) {
      const tmpCalleeParam$15 = $(2);
      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$15);
      if (tmpClusterSSA_tmpIfTest$9) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$14 = $(0);
  const tmpIfTest$5 = $(tmpCalleeParam$14);
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$16 = $(1);
    const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$10) {
      const tmpCalleeParam$18 = $(2);
      const tmpClusterSSA_tmpIfTest$12 = $(tmpCalleeParam$18);
      if (tmpClusterSSA_tmpIfTest$12) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$17 = $(0);
  const tmpIfTest$6 = $(tmpCalleeParam$17);
  if (tmpIfTest$6) {
  } else {
    const tmpCalleeParam$19 = $(1);
    const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$19);
    if (tmpClusterSSA_tmpIfTest$11) {
      const tmpCalleeParam$21 = $(2);
      const tmpClusterSSA_tmpIfTest$13 = $(tmpCalleeParam$21);
      if (tmpClusterSSA_tmpIfTest$13) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$20 = $(0);
  const tmpIfTest$7 = $(tmpCalleeParam$20);
  if (tmpIfTest$7) {
  } else {
    const tmpCalleeParam$22 = $(1);
    const tmpClusterSSA_tmpIfTest$14 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_tmpIfTest$14) {
      const tmpCalleeParam$24 = $(2);
      const tmpClusterSSA_tmpIfTest$16 = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$16) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$23 = $(0);
  const tmpIfTest$8 = $(tmpCalleeParam$23);
  if (tmpIfTest$8) {
  } else {
    const tmpCalleeParam$25 = $(1);
    const tmpClusterSSA_tmpIfTest$15 = $(tmpCalleeParam$25);
    if (tmpClusterSSA_tmpIfTest$15) {
      const tmpCalleeParam$27 = $(2);
      const tmpClusterSSA_tmpIfTest$17 = $(tmpCalleeParam$27);
      if (tmpClusterSSA_tmpIfTest$17) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$26 = $(0);
  const tmpIfTest$9 = $(tmpCalleeParam$26);
  if (tmpIfTest$9) {
  } else {
    const tmpCalleeParam$28 = $(1);
    const tmpClusterSSA_tmpIfTest$18 = $(tmpCalleeParam$28);
    if (tmpClusterSSA_tmpIfTest$18) {
      const tmpCalleeParam$30 = $(2);
      const tmpClusterSSA_tmpIfTest$20 = $(tmpCalleeParam$30);
      if (tmpClusterSSA_tmpIfTest$20) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$29 = $(0);
  const tmpIfTest$10 = $(tmpCalleeParam$29);
  if (tmpIfTest$10) {
  } else {
    const tmpCalleeParam$31 = $(1);
    const tmpClusterSSA_tmpIfTest$19 = $(tmpCalleeParam$31);
    if (tmpClusterSSA_tmpIfTest$19) {
      const tmpCalleeParam$33 = $(2);
      const tmpClusterSSA_tmpIfTest$21 = $(tmpCalleeParam$33);
      if (tmpClusterSSA_tmpIfTest$21) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 = $(0);
    const tmpIfTest$11 = $(tmpCalleeParam$32);
    if (tmpIfTest$11) {
    } else {
      const tmpCalleeParam$34 = $(1);
      const tmpClusterSSA_tmpIfTest$22 = $(tmpCalleeParam$34);
      if (tmpClusterSSA_tmpIfTest$22) {
        const tmpCalleeParam$36 = $(2);
        const tmpClusterSSA_tmpIfTest$24 = $(tmpCalleeParam$36);
        if (tmpClusterSSA_tmpIfTest$24) {
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  $( 100 );
  const a = $( 0 );
  const b = $( a );
  if (b) {

  }
  else {
    const c = $( 1 );
    const d = $( c );
    if (d) {
      const e = $( 2 );
      const f = $( e );
      if (f) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
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
      const k = $( 2 );
      const l = $( k );
      if (l) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const m = $( 0 );
  const n = $( m );
  if (n) {

  }
  else {
    const o = $( 1 );
    const p = $( o );
    if (p) {
      const q = $( 2 );
      const r = $( q );
      if (r) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const s = $( 0 );
  const t = $( s );
  if (t) {

  }
  else {
    const u = $( 1 );
    const v = $( u );
    if (v) {
      const w = $( 2 );
      const x = $( w );
      if (x) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const y = $( 0 );
  const z = $( y );
  if (z) {

  }
  else {
    const ba = $( 1 );
    const bb = $( ba );
    if (bb) {
      const bc = $( 2 );
      const bd = $( bc );
      if (bd) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const be = $( 0 );
  const bf = $( be );
  if (bf) {

  }
  else {
    const bg = $( 1 );
    const bh = $( bg );
    if (bh) {
      const bi = $( 2 );
      const bj = $( bi );
      if (bj) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
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
      const bo = $( 2 );
      const bp = $( bo );
      if (bp) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bq = $( 0 );
  const br = $( bq );
  if (br) {

  }
  else {
    const bs = $( 1 );
    const bt = $( bs );
    if (bt) {
      const bu = $( 2 );
      const bv = $( bu );
      if (bv) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bw = $( 0 );
  const bx = $( bw );
  if (bx) {

  }
  else {
    const by = $( 1 );
    const bz = $( by );
    if (bz) {
      const ca = $( 2 );
      const cb = $( ca );
      if (cb) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const cc = $( 0 );
  const cd = $( cc );
  if (cd) {

  }
  else {
    const ce = $( 1 );
    const cf = $( ce );
    if (cf) {
      const cg = $( 2 );
      const ch = $( cg );
      if (ch) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const ci = $( 0 );
  const cj = $( ci );
  if (cj) {

  }
  else {
    const ck = $( 1 );
    const cl = $( ck );
    if (cl) {
      const cm = $( 2 );
      const cn = $( cm );
      if (cn) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const co = $( 0 );
    const cp = $( co );
    if (cp) {

    }
    else {
      const cq = $( 1 );
      const cr = $( cq );
      if (cr) {
        const cs = $( 2 );
        const ct = $( cs );
        if (ct) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
  }
}
const cu = {
  a: 999,
  b: 1000,
};
$( cu );
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
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
