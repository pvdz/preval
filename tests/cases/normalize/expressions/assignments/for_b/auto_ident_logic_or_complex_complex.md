# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || $($(2))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($(0)) || $($(2)))) {
    $(1);
  }
}
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
    $(1);
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
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(1);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    $(1);
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$4);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a$2) {
    $(1);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$6 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$6);
  if (tmpClusterSSA_a$3) {
    $(1);
  } else {
    const tmpCalleeParam$8 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$8);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpClusterSSA_a$4) {
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
  const tmpCalleeParam$10 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$10);
  if (tmpClusterSSA_a$5) {
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
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$6) {
    $(1);
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$13);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$7) {
    $(1);
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$16);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$15 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$15);
  if (tmpClusterSSA_a$8) {
    $(1);
  } else {
    const tmpCalleeParam$17 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$17);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$18 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$18);
  if (tmpClusterSSA_a$9) {
    $(1);
  } else {
    const tmpCalleeParam$20 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$20);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$19 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$19);
  if (tmpClusterSSA_a$10) {
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
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$22 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$11) {
      $(1);
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
        $(1);
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
let a = undefined;
loopStop: {
  const b = $( 0 );
  const c = $( b );
  if (c) {
    $( 1 );
  }
  else {
    const d = $( 2 );
    a = $( d );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( 1 );
  }
  else {
    const g = $( 2 );
    a = $( g );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const h = $( 0 );
  const i = $( h );
  if (i) {
    $( 1 );
  }
  else {
    const j = $( 2 );
    a = $( j );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const k = $( 0 );
  const l = $( k );
  if (l) {
    $( 1 );
  }
  else {
    const m = $( 2 );
    a = $( m );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const n = $( 0 );
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
  const q = $( 0 );
  const r = $( q );
  if (r) {
    $( 1 );
  }
  else {
    const s = $( 2 );
    a = $( s );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const t = $( 0 );
  const u = $( t );
  if (u) {
    $( 1 );
  }
  else {
    const v = $( 2 );
    a = $( v );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const w = $( 0 );
  const x = $( w );
  if (x) {
    $( 1 );
  }
  else {
    const y = $( 2 );
    a = $( y );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const z = $( 0 );
  const ba = $( z );
  if (ba) {
    $( 1 );
  }
  else {
    const bb = $( 2 );
    a = $( bb );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const bc = $( 0 );
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
  const bf = $( 0 );
  const bg = $( bf );
  if (bg) {
    $( 1 );
  }
  else {
    const bh = $( 2 );
    a = $( bh );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const bi = $( 0 );
    const bj = $( bi );
    if (bj) {
      $( 1 );
    }
    else {
      const bk = $( 2 );
      a = $( bk );
      if (a) {
        $( 1 );
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
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
