# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > While > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || ($($(1)) && $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || ($($(1)) && $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      if (tmpIfTest) {
        $(100);
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
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCalleeParam$3 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
      if (tmpClusterSSA_tmpIfTest$1) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 = $(1);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$2) {
      const tmpCalleeParam$6 = $(2);
      const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$6);
      if (tmpClusterSSA_tmpIfTest$4) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$5 = $(0);
  const tmpIfTest$2 = $(tmpCalleeParam$5);
  if (tmpIfTest$2) {
    $(100);
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$7);
    if (tmpClusterSSA_tmpIfTest$3) {
      const tmpCalleeParam$9 = $(2);
      const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$9);
      if (tmpClusterSSA_tmpIfTest$5) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$8 = $(0);
  const tmpIfTest$3 = $(tmpCalleeParam$8);
  if (tmpIfTest$3) {
    $(100);
  } else {
    const tmpCalleeParam$10 = $(1);
    const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$10);
    if (tmpClusterSSA_tmpIfTest$6) {
      const tmpCalleeParam$12 = $(2);
      const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$12);
      if (tmpClusterSSA_tmpIfTest$8) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 = $(0);
  const tmpIfTest$4 = $(tmpCalleeParam$11);
  if (tmpIfTest$4) {
    $(100);
  } else {
    const tmpCalleeParam$13 = $(1);
    const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$7) {
      const tmpCalleeParam$15 = $(2);
      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$15);
      if (tmpClusterSSA_tmpIfTest$9) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 = $(0);
  const tmpIfTest$5 = $(tmpCalleeParam$14);
  if (tmpIfTest$5) {
    $(100);
  } else {
    const tmpCalleeParam$16 = $(1);
    const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$10) {
      const tmpCalleeParam$18 = $(2);
      const tmpClusterSSA_tmpIfTest$12 = $(tmpCalleeParam$18);
      if (tmpClusterSSA_tmpIfTest$12) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$17 = $(0);
  const tmpIfTest$6 = $(tmpCalleeParam$17);
  if (tmpIfTest$6) {
    $(100);
  } else {
    const tmpCalleeParam$19 = $(1);
    const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$19);
    if (tmpClusterSSA_tmpIfTest$11) {
      const tmpCalleeParam$21 = $(2);
      const tmpClusterSSA_tmpIfTest$13 = $(tmpCalleeParam$21);
      if (tmpClusterSSA_tmpIfTest$13) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$20 = $(0);
  const tmpIfTest$7 = $(tmpCalleeParam$20);
  if (tmpIfTest$7) {
    $(100);
  } else {
    const tmpCalleeParam$22 = $(1);
    const tmpClusterSSA_tmpIfTest$14 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_tmpIfTest$14) {
      const tmpCalleeParam$24 = $(2);
      const tmpClusterSSA_tmpIfTest$16 = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$16) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$23 = $(0);
  const tmpIfTest$8 = $(tmpCalleeParam$23);
  if (tmpIfTest$8) {
    $(100);
  } else {
    const tmpCalleeParam$25 = $(1);
    const tmpClusterSSA_tmpIfTest$15 = $(tmpCalleeParam$25);
    if (tmpClusterSSA_tmpIfTest$15) {
      const tmpCalleeParam$27 = $(2);
      const tmpClusterSSA_tmpIfTest$17 = $(tmpCalleeParam$27);
      if (tmpClusterSSA_tmpIfTest$17) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$26 = $(0);
  const tmpIfTest$9 = $(tmpCalleeParam$26);
  if (tmpIfTest$9) {
    $(100);
  } else {
    const tmpCalleeParam$28 = $(1);
    const tmpClusterSSA_tmpIfTest$18 = $(tmpCalleeParam$28);
    if (tmpClusterSSA_tmpIfTest$18) {
      const tmpCalleeParam$30 = $(2);
      const tmpClusterSSA_tmpIfTest$20 = $(tmpCalleeParam$30);
      if (tmpClusterSSA_tmpIfTest$20) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$29 = $(0);
  const tmpIfTest$10 = $(tmpCalleeParam$29);
  if (tmpIfTest$10) {
    $(100);
  } else {
    const tmpCalleeParam$31 = $(1);
    const tmpClusterSSA_tmpIfTest$19 = $(tmpCalleeParam$31);
    if (tmpClusterSSA_tmpIfTest$19) {
      const tmpCalleeParam$33 = $(2);
      const tmpClusterSSA_tmpIfTest$21 = $(tmpCalleeParam$33);
      if (tmpClusterSSA_tmpIfTest$21) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$32 = $(0);
    const tmpIfTest$11 = $(tmpCalleeParam$32);
    if (tmpIfTest$11) {
      $(100);
    } else {
      const tmpCalleeParam$34 = $(1);
      const tmpClusterSSA_tmpIfTest$22 = $(tmpCalleeParam$34);
      if (tmpClusterSSA_tmpIfTest$22) {
        const tmpCalleeParam$36 = $(2);
        const tmpClusterSSA_tmpIfTest$24 = $(tmpCalleeParam$36);
        if (tmpClusterSSA_tmpIfTest$24) {
          $(100);
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
  const a = $( 0 );
  const b = $( a );
  if (b) {
    $( 100 );
  }
  else {
    const c = $( 1 );
    const d = $( c );
    if (d) {
      const e = $( 2 );
      const f = $( e );
      if (f) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const g = $( 0 );
  const h = $( g );
  if (h) {
    $( 100 );
  }
  else {
    const i = $( 1 );
    const j = $( i );
    if (j) {
      const k = $( 2 );
      const l = $( k );
      if (l) {
        $( 100 );
      }
      else {
        break loopStop;
      }
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
    const o = $( 1 );
    const p = $( o );
    if (p) {
      const q = $( 2 );
      const r = $( q );
      if (r) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const s = $( 0 );
  const t = $( s );
  if (t) {
    $( 100 );
  }
  else {
    const u = $( 1 );
    const v = $( u );
    if (v) {
      const w = $( 2 );
      const x = $( w );
      if (x) {
        $( 100 );
      }
      else {
        break loopStop;
      }
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
    const ba = $( 1 );
    const bb = $( ba );
    if (bb) {
      const bc = $( 2 );
      const bd = $( bc );
      if (bd) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const be = $( 0 );
  const bf = $( be );
  if (bf) {
    $( 100 );
  }
  else {
    const bg = $( 1 );
    const bh = $( bg );
    if (bh) {
      const bi = $( 2 );
      const bj = $( bi );
      if (bj) {
        $( 100 );
      }
      else {
        break loopStop;
      }
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
    const bm = $( 1 );
    const bn = $( bm );
    if (bn) {
      const bo = $( 2 );
      const bp = $( bo );
      if (bp) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const bq = $( 0 );
  const br = $( bq );
  if (br) {
    $( 100 );
  }
  else {
    const bs = $( 1 );
    const bt = $( bs );
    if (bt) {
      const bu = $( 2 );
      const bv = $( bu );
      if (bv) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const bw = $( 0 );
  const bx = $( bw );
  if (bx) {
    $( 100 );
  }
  else {
    const by = $( 1 );
    const bz = $( by );
    if (bz) {
      const ca = $( 2 );
      const cb = $( ca );
      if (cb) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const cc = $( 0 );
  const cd = $( cc );
  if (cd) {
    $( 100 );
  }
  else {
    const ce = $( 1 );
    const cf = $( ce );
    if (cf) {
      const cg = $( 2 );
      const ch = $( cg );
      if (ch) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  const ci = $( 0 );
  const cj = $( ci );
  if (cj) {
    $( 100 );
  }
  else {
    const ck = $( 1 );
    const cl = $( ck );
    if (cl) {
      const cm = $( 2 );
      const cn = $( cm );
      if (cn) {
        $( 100 );
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
    const co = $( 0 );
    const cp = $( co );
    if (cp) {
      $( 100 );
    }
    else {
      const cq = $( 1 );
      const cr = $( cq );
      if (cr) {
        const cs = $( 2 );
        const ct = $( cs );
        if (ct) {
          $( 100 );
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 2
 - 14: 100
 - 15: 0
 - 16: 0
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
