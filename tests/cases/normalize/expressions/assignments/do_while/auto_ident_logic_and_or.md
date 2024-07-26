# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = ($($(1)) && $($(1))) || $($(2)))) {
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
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
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
let a = 1;
loopStop$2: {
  $(100);
  const tmpCalleeParam = $(1);
  let tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$1 = $(1);
    tmpClusterSSA_a = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$2 = $(1);
  let tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$4 = $(1);
    tmpClusterSSA_a$1 = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpClusterSSA_a$1) {
  } else {
    const tmpCalleeParam$6 = $(2);
    a = $(tmpCalleeParam$6);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$5 = $(1);
  let tmpClusterSSA_a$2 = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$2) {
    const tmpCalleeParam$7 = $(1);
    tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$9 = $(2);
    a = $(tmpCalleeParam$9);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$8 = $(1);
  let tmpClusterSSA_a$3 = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$3) {
    const tmpCalleeParam$10 = $(1);
    tmpClusterSSA_a$3 = $(tmpCalleeParam$10);
  } else {
  }
  if (tmpClusterSSA_a$3) {
  } else {
    const tmpCalleeParam$12 = $(2);
    a = $(tmpCalleeParam$12);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$11 = $(1);
  let tmpClusterSSA_a$4 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$4) {
    const tmpCalleeParam$13 = $(1);
    tmpClusterSSA_a$4 = $(tmpCalleeParam$13);
  } else {
  }
  if (tmpClusterSSA_a$4) {
  } else {
    const tmpCalleeParam$15 = $(2);
    a = $(tmpCalleeParam$15);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$14 = $(1);
  let tmpClusterSSA_a$5 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$5) {
    const tmpCalleeParam$16 = $(1);
    tmpClusterSSA_a$5 = $(tmpCalleeParam$16);
  } else {
  }
  if (tmpClusterSSA_a$5) {
  } else {
    const tmpCalleeParam$18 = $(2);
    a = $(tmpCalleeParam$18);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$17 = $(1);
  let tmpClusterSSA_a$6 = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$6) {
    const tmpCalleeParam$19 = $(1);
    tmpClusterSSA_a$6 = $(tmpCalleeParam$19);
  } else {
  }
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$21 = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$20 = $(1);
  let tmpClusterSSA_a$7 = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$7) {
    const tmpCalleeParam$22 = $(1);
    tmpClusterSSA_a$7 = $(tmpCalleeParam$22);
  } else {
  }
  if (tmpClusterSSA_a$7) {
  } else {
    const tmpCalleeParam$24 = $(2);
    a = $(tmpCalleeParam$24);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$23 = $(1);
  let tmpClusterSSA_a$8 = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$8) {
    const tmpCalleeParam$25 = $(1);
    tmpClusterSSA_a$8 = $(tmpCalleeParam$25);
  } else {
  }
  if (tmpClusterSSA_a$8) {
  } else {
    const tmpCalleeParam$27 = $(2);
    a = $(tmpCalleeParam$27);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$26 = $(1);
  let tmpClusterSSA_a$9 = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$9) {
    const tmpCalleeParam$28 = $(1);
    tmpClusterSSA_a$9 = $(tmpCalleeParam$28);
  } else {
  }
  if (tmpClusterSSA_a$9) {
  } else {
    const tmpCalleeParam$30 = $(2);
    a = $(tmpCalleeParam$30);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  $(100);
  const tmpCalleeParam$29 = $(1);
  let tmpClusterSSA_a$10 = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$10) {
    const tmpCalleeParam$31 = $(1);
    tmpClusterSSA_a$10 = $(tmpCalleeParam$31);
  } else {
  }
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$33 = $(2);
    a = $(tmpCalleeParam$33);
    if (a) {
    } else {
      break loopStop$2;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 = $(1);
    let tmpClusterSSA_a$11 = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$11) {
      const tmpCalleeParam$34 = $(1);
      tmpClusterSSA_a$11 = $(tmpCalleeParam$34);
    } else {
    }
    if (tmpClusterSSA_a$11) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
loopStop$2: {
  $( 100 );
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {

  }
  else {
    const e = $( 2 );
    a = $( e );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 1 );
    g = $( h );
  }
  if (g) {

  }
  else {
    const i = $( 2 );
    a = $( i );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const j = $( 1 );
  let k = $( j );
  if (k) {
    const l = $( 1 );
    k = $( l );
  }
  if (k) {

  }
  else {
    const m = $( 2 );
    a = $( m );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const n = $( 1 );
  let o = $( n );
  if (o) {
    const p = $( 1 );
    o = $( p );
  }
  if (o) {

  }
  else {
    const q = $( 2 );
    a = $( q );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const r = $( 1 );
  let s = $( r );
  if (s) {
    const t = $( 1 );
    s = $( t );
  }
  if (s) {

  }
  else {
    const u = $( 2 );
    a = $( u );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const v = $( 1 );
  let w = $( v );
  if (w) {
    const x = $( 1 );
    w = $( x );
  }
  if (w) {

  }
  else {
    const y = $( 2 );
    a = $( y );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const z = $( 1 );
  let 01 = $( z );
  if (01) {
    const 11 = $( 1 );
    01 = $( 11 );
  }
  if (01) {

  }
  else {
    const 21 = $( 2 );
    a = $( 21 );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const 31 = $( 1 );
  let 41 = $( 31 );
  if (41) {
    const 51 = $( 1 );
    41 = $( 51 );
  }
  if (41) {

  }
  else {
    const 61 = $( 2 );
    a = $( 61 );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const 71 = $( 1 );
  let 81 = $( 71 );
  if (81) {
    const 91 = $( 1 );
    81 = $( 91 );
  }
  if (81) {

  }
  else {
    const a1 = $( 2 );
    a = $( a1 );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const b1 = $( 1 );
  let c1 = $( b1 );
  if (c1) {
    const d1 = $( 1 );
    c1 = $( d1 );
  }
  if (c1) {

  }
  else {
    const e1 = $( 2 );
    a = $( e1 );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  $( 100 );
  const f1 = $( 1 );
  let g1 = $( f1 );
  if (g1) {
    const h1 = $( 1 );
    g1 = $( h1 );
  }
  if (g1) {

  }
  else {
    const i1 = $( 2 );
    a = $( i1 );
    if (a) {

    }
    else {
      break loopStop$2;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const j1 = $( 1 );
    let k1 = $( j1 );
    if (k1) {
      const l1 = $( 1 );
      k1 = $( l1 );
    }
    if (k1) {

    }
    else {
      const m1 = $( 2 );
      a = $( m1 );
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
