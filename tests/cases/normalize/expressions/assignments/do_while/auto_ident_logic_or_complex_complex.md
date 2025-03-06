# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || $($(2)))) {
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
    const tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
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
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$1);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$4);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$6 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$6);
  if (tmpClusterSSA_a$3) {
  } else {
    const tmpCalleeParam$8 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$8);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpClusterSSA_a$4) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$9);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$10 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$10);
  if (tmpClusterSSA_a$5) {
  } else {
    const tmpCalleeParam$12 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$12);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$13);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$7) {
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$16);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$15 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$15);
  if (tmpClusterSSA_a$8) {
  } else {
    const tmpCalleeParam$17 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$17);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$18 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$18);
  if (tmpClusterSSA_a$9) {
  } else {
    const tmpCalleeParam$20 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$20);
    if (a) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$19 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$19);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$21 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$22 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$11) {
    } else {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
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
  $( 100 );
  const b = $( 0 );
  const c = $( b );
  if (c) {

  }
  else {
    const d = $( 2 );
    a = $( d );
    if (a) {

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
    a = $( g );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const h = $( 0 );
  const i = $( h );
  if (i) {

  }
  else {
    const j = $( 2 );
    a = $( j );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const k = $( 0 );
  const l = $( k );
  if (l) {

  }
  else {
    const m = $( 2 );
    a = $( m );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const n = $( 0 );
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
  $( 100 );
  const q = $( 0 );
  const r = $( q );
  if (r) {

  }
  else {
    const s = $( 2 );
    a = $( s );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const t = $( 0 );
  const u = $( t );
  if (u) {

  }
  else {
    const v = $( 2 );
    a = $( v );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const w = $( 0 );
  const x = $( w );
  if (x) {

  }
  else {
    const y = $( 2 );
    a = $( y );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const z = $( 0 );
  const ba = $( z );
  if (ba) {

  }
  else {
    const bb = $( 2 );
    a = $( bb );
    if (a) {

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
    a = $( be );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bf = $( 0 );
  const bg = $( bf );
  if (bg) {

  }
  else {
    const bh = $( 2 );
    a = $( bh );
    if (a) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const bi = $( 0 );
    const bj = $( bi );
    if (bj) {

    }
    else {
      const bk = $( 2 );
      a = $( bk );
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

Todos triggered:
- objects in isFree check