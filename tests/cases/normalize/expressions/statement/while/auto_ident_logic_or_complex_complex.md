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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(2))) $(100);
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
    const tmpCalleeParam$1 = $(2);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(100);
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
    const tmpCalleeParam$1 = $(2);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 = $(2);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$3 = $(0);
  const tmpIfTest$2 = $(tmpCalleeParam$3);
  if (tmpIfTest$2) {
    $(100);
  } else {
    const tmpCalleeParam$5 = $(2);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$5);
    if (tmpClusterSSA_tmpIfTest$2) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$6 = $(0);
  const tmpIfTest$3 = $(tmpCalleeParam$6);
  if (tmpIfTest$3) {
    $(100);
  } else {
    const tmpCalleeParam$8 = $(2);
    const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$8);
    if (tmpClusterSSA_tmpIfTest$3) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$7 = $(0);
  const tmpIfTest$4 = $(tmpCalleeParam$7);
  if (tmpIfTest$4) {
    $(100);
  } else {
    const tmpCalleeParam$9 = $(2);
    const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpIfTest$4) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$10 = $(0);
  const tmpIfTest$5 = $(tmpCalleeParam$10);
  if (tmpIfTest$5) {
    $(100);
  } else {
    const tmpCalleeParam$12 = $(2);
    const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$12);
    if (tmpClusterSSA_tmpIfTest$5) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 = $(0);
  const tmpIfTest$6 = $(tmpCalleeParam$11);
  if (tmpIfTest$6) {
    $(100);
  } else {
    const tmpCalleeParam$13 = $(2);
    const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$6) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 = $(0);
  const tmpIfTest$7 = $(tmpCalleeParam$14);
  if (tmpIfTest$7) {
    $(100);
  } else {
    const tmpCalleeParam$16 = $(2);
    const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$7) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$15 = $(0);
  const tmpIfTest$8 = $(tmpCalleeParam$15);
  if (tmpIfTest$8) {
    $(100);
  } else {
    const tmpCalleeParam$17 = $(2);
    const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$17);
    if (tmpClusterSSA_tmpIfTest$8) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$18 = $(0);
  const tmpIfTest$9 = $(tmpCalleeParam$18);
  if (tmpIfTest$9) {
    $(100);
  } else {
    const tmpCalleeParam$20 = $(2);
    const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$20);
    if (tmpClusterSSA_tmpIfTest$9) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$19 = $(0);
  const tmpIfTest$10 = $(tmpCalleeParam$19);
  if (tmpIfTest$10) {
    $(100);
  } else {
    const tmpCalleeParam$21 = $(2);
    const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$21);
    if (tmpClusterSSA_tmpIfTest$10) {
      $(100);
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$22 = $(0);
    const tmpIfTest$11 = $(tmpCalleeParam$22);
    if (tmpIfTest$11) {
      $(100);
    } else {
      const tmpCalleeParam$24 = $(2);
      const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$11) {
        $(100);
      } else {
        break;
      }
    }
  }
}
const a = { a: 999, b: 1000 };
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
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
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

## Globals

None

## Result

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

Final output calls: Same
