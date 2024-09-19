# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = 1;
loopStop: {
  const tmpCalleeParam = $(0);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 = $(0);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 = $(2);
    a = $(tmpCalleeParam$4);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$3 = $(0);
  const tmpClusterSSA_a$2 = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a$2) {
    $(100);
  } else {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$6 = $(0);
  const tmpClusterSSA_a$3 = $(tmpCalleeParam$6);
  if (tmpClusterSSA_a$3) {
    $(100);
  } else {
    const tmpCalleeParam$8 = $(2);
    a = $(tmpCalleeParam$8);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$7 = $(0);
  const tmpClusterSSA_a$4 = $(tmpCalleeParam$7);
  if (tmpClusterSSA_a$4) {
    $(100);
  } else {
    const tmpCalleeParam$9 = $(2);
    a = $(tmpCalleeParam$9);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$10 = $(0);
  const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
  if (tmpClusterSSA_a$5) {
    $(100);
  } else {
    const tmpCalleeParam$12 = $(2);
    a = $(tmpCalleeParam$12);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 = $(0);
  const tmpClusterSSA_a$6 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$6) {
    $(100);
  } else {
    const tmpCalleeParam$13 = $(2);
    a = $(tmpCalleeParam$13);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 = $(0);
  const tmpClusterSSA_a$7 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$7) {
    $(100);
  } else {
    const tmpCalleeParam$16 = $(2);
    a = $(tmpCalleeParam$16);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$15 = $(0);
  const tmpClusterSSA_a$8 = $(tmpCalleeParam$15);
  if (tmpClusterSSA_a$8) {
    $(100);
  } else {
    const tmpCalleeParam$17 = $(2);
    a = $(tmpCalleeParam$17);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$18 = $(0);
  const tmpClusterSSA_a$9 = $(tmpCalleeParam$18);
  if (tmpClusterSSA_a$9) {
    $(100);
  } else {
    const tmpCalleeParam$20 = $(2);
    a = $(tmpCalleeParam$20);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$19 = $(0);
  const tmpClusterSSA_a$10 = $(tmpCalleeParam$19);
  if (tmpClusterSSA_a$10) {
    $(100);
  } else {
    const tmpCalleeParam$21 = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
      $(100);
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$22 = $(0);
    const tmpClusterSSA_a$11 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$11) {
      $(100);
    } else {
      const tmpCalleeParam$24 = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
        $(100);
      } else {
        break;
      }
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
loopStop: {
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
    $( 100 );
  }
  else {
    const bh = $( 2 );
    a = $( bh );
    if (a) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const bi = $( 0 );
    const bj = $( bi );
    if (bj) {
      $( 100 );
    }
    else {
      const bk = $( 2 );
      a = $( bk );
      if (a) {
        $( 100 );
      }
      else {
        break;
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
