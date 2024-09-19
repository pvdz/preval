# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(0)) || $($(2))) {
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
    const tmpCalleeParam$1 = $(2);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
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
    const tmpCalleeParam$1 = $(2);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$2 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$4 = $(2);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$3 = $(0);
  const tmpIfTest$2 = $(tmpCalleeParam$3);
  if (tmpIfTest$2) {
  } else {
    const tmpCalleeParam$5 = $(2);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$5);
    if (tmpClusterSSA_tmpIfTest$2) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$6 = $(0);
  const tmpIfTest$3 = $(tmpCalleeParam$6);
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$8 = $(2);
    const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$8);
    if (tmpClusterSSA_tmpIfTest$3) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$7 = $(0);
  const tmpIfTest$4 = $(tmpCalleeParam$7);
  if (tmpIfTest$4) {
  } else {
    const tmpCalleeParam$9 = $(2);
    const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpIfTest$4) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$10 = $(0);
  const tmpIfTest$5 = $(tmpCalleeParam$10);
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$12 = $(2);
    const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$12);
    if (tmpClusterSSA_tmpIfTest$5) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$11 = $(0);
  const tmpIfTest$6 = $(tmpCalleeParam$11);
  if (tmpIfTest$6) {
  } else {
    const tmpCalleeParam$13 = $(2);
    const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$6) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$14 = $(0);
  const tmpIfTest$7 = $(tmpCalleeParam$14);
  if (tmpIfTest$7) {
  } else {
    const tmpCalleeParam$16 = $(2);
    const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$7) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$15 = $(0);
  const tmpIfTest$8 = $(tmpCalleeParam$15);
  if (tmpIfTest$8) {
  } else {
    const tmpCalleeParam$17 = $(2);
    const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$17);
    if (tmpClusterSSA_tmpIfTest$8) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$18 = $(0);
  const tmpIfTest$9 = $(tmpCalleeParam$18);
  if (tmpIfTest$9) {
  } else {
    const tmpCalleeParam$20 = $(2);
    const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$20);
    if (tmpClusterSSA_tmpIfTest$9) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$19 = $(0);
  const tmpIfTest$10 = $(tmpCalleeParam$19);
  if (tmpIfTest$10) {
  } else {
    const tmpCalleeParam$21 = $(2);
    const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$21);
    if (tmpClusterSSA_tmpIfTest$10) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$22 = $(0);
    const tmpIfTest$11 = $(tmpCalleeParam$22);
    if (tmpIfTest$11) {
    } else {
      const tmpCalleeParam$24 = $(2);
      const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$11) {
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
  $( 100 );
  const a = $( 0 );
  const b = $( a );
  if (b) {

  }
  else {
    const c = $( 2 );
    const d = $( c );
    if (d) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const e = $( 0 );
  const f = $( e );
  if (f) {

  }
  else {
    const g = $( 2 );
    const h = $( g );
    if (h) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const i = $( 0 );
  const j = $( i );
  if (j) {

  }
  else {
    const k = $( 2 );
    const l = $( k );
    if (l) {

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
    const o = $( 2 );
    const p = $( o );
    if (p) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const q = $( 0 );
  const r = $( q );
  if (r) {

  }
  else {
    const s = $( 2 );
    const t = $( s );
    if (t) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const u = $( 0 );
  const v = $( u );
  if (v) {

  }
  else {
    const w = $( 2 );
    const x = $( w );
    if (x) {

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
    const ba = $( 2 );
    const bb = $( ba );
    if (bb) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bc = $( 0 );
  const bd = $( bc );
  if (bd) {

  }
  else {
    const be = $( 2 );
    const bf = $( be );
    if (bf) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bg = $( 0 );
  const bh = $( bg );
  if (bh) {

  }
  else {
    const bi = $( 2 );
    const bj = $( bi );
    if (bj) {

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
    const bm = $( 2 );
    const bn = $( bm );
    if (bn) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bo = $( 0 );
  const bp = $( bo );
  if (bp) {

  }
  else {
    const bq = $( 2 );
    const br = $( bq );
    if (br) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const bs = $( 0 );
    const bt = $( bs );
    if (bt) {

    }
    else {
      const bu = $( 2 );
      const bv = $( bu );
      if (bv) {

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

Final output calls: Same
