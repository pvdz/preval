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
let a = { a: 999, b: 1000 };
loopStop$2: {
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
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$2 = $(0);
  const tmpClusterSSA_a$4 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$4) {
  } else {
    const tmpCalleeParam$4 = $(1);
    const tmpClusterSSA_a$3 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_a$3) {
    } else {
      const tmpCalleeParam$6 = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$5 = $(0);
  const tmpClusterSSA_a$6 = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
    if (tmpClusterSSA_a$2) {
    } else {
      const tmpCalleeParam$9 = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$8 = $(0);
  const tmpClusterSSA_a$8 = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$8) {
  } else {
    const tmpCalleeParam$10 = $(1);
    const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
    if (tmpClusterSSA_a$5) {
    } else {
      const tmpCalleeParam$12 = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$11 = $(0);
  const tmpClusterSSA_a$10 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$13 = $(1);
    const tmpClusterSSA_a$7 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_a$7) {
    } else {
      const tmpCalleeParam$15 = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$14 = $(0);
  const tmpClusterSSA_a$12 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$12) {
  } else {
    const tmpCalleeParam$16 = $(1);
    const tmpClusterSSA_a$9 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_a$9) {
    } else {
      const tmpCalleeParam$18 = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$17 = $(0);
  const tmpClusterSSA_a$14 = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$14) {
  } else {
    const tmpCalleeParam$19 = $(1);
    const tmpClusterSSA_a$11 = $(tmpCalleeParam$19);
    if (tmpClusterSSA_a$11) {
    } else {
      const tmpCalleeParam$21 = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$20 = $(0);
  const tmpClusterSSA_a$16 = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$16) {
  } else {
    const tmpCalleeParam$22 = $(1);
    const tmpClusterSSA_a$13 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_a$13) {
    } else {
      const tmpCalleeParam$24 = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$23 = $(0);
  const tmpClusterSSA_a$18 = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$18) {
  } else {
    const tmpCalleeParam$25 = $(1);
    const tmpClusterSSA_a$15 = $(tmpCalleeParam$25);
    if (tmpClusterSSA_a$15) {
    } else {
      const tmpCalleeParam$27 = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$26 = $(0);
  const tmpClusterSSA_a$20 = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$20) {
  } else {
    const tmpCalleeParam$28 = $(1);
    const tmpClusterSSA_a$17 = $(tmpCalleeParam$28);
    if (tmpClusterSSA_a$17) {
    } else {
      const tmpCalleeParam$30 = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  $(100);
  const tmpCalleeParam$29 = $(0);
  const tmpClusterSSA_a$22 = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$22) {
  } else {
    const tmpCalleeParam$31 = $(1);
    const tmpClusterSSA_a$19 = $(tmpCalleeParam$31);
    if (tmpClusterSSA_a$19) {
    } else {
      const tmpCalleeParam$33 = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
      } else {
        break loopStop$2;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 = $(0);
    a = $(tmpCalleeParam$32);
    if (a) {
    } else {
      const tmpCalleeParam$34 = $(1);
      const tmpClusterSSA_a$21 = $(tmpCalleeParam$34);
      if (tmpClusterSSA_a$21) {
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
let a = {
  a: 999,
  b: 1000,
};
loopStop$2: {
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
        break loopStop$2;
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
        break loopStop$2;
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
        break loopStop$2;
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
        break loopStop$2;
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
        break loopStop$2;
      }
    }
  }
  $( 100 );
  const 01 = $( 0 );
  const 11 = $( 01 );
  if (11) {

  }
  else {
    const 21 = $( 1 );
    const 31 = $( 21 );
    if (31) {

    }
    else {
      const 41 = $( 2 );
      a = $( 41 );
      if (a) {

      }
      else {
        break loopStop$2;
      }
    }
  }
  $( 100 );
  const 51 = $( 0 );
  const 61 = $( 51 );
  if (61) {

  }
  else {
    const 71 = $( 1 );
    const 81 = $( 71 );
    if (81) {

    }
    else {
      const 91 = $( 2 );
      a = $( 91 );
      if (a) {

      }
      else {
        break loopStop$2;
      }
    }
  }
  $( 100 );
  const a1 = $( 0 );
  const b1 = $( a1 );
  if (b1) {

  }
  else {
    const c1 = $( 1 );
    const d1 = $( c1 );
    if (d1) {

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
  }
  $( 100 );
  const f1 = $( 0 );
  const g1 = $( f1 );
  if (g1) {

  }
  else {
    const h1 = $( 1 );
    const i1 = $( h1 );
    if (i1) {

    }
    else {
      const j1 = $( 2 );
      a = $( j1 );
      if (a) {

      }
      else {
        break loopStop$2;
      }
    }
  }
  $( 100 );
  const k1 = $( 0 );
  const l1 = $( k1 );
  if (l1) {

  }
  else {
    const m1 = $( 1 );
    const n1 = $( m1 );
    if (n1) {

    }
    else {
      const o1 = $( 2 );
      a = $( o1 );
      if (a) {

      }
      else {
        break loopStop$2;
      }
    }
  }
  $( 100 );
  const p1 = $( 0 );
  const q1 = $( p1 );
  if (q1) {

  }
  else {
    const r1 = $( 1 );
    const s1 = $( r1 );
    if (s1) {

    }
    else {
      const t1 = $( 2 );
      a = $( t1 );
      if (a) {

      }
      else {
        break loopStop$2;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const u1 = $( 0 );
    a = $( u1 );
    if (a) {

    }
    else {
      const v1 = $( 1 );
      const w1 = $( v1 );
      if (w1) {

      }
      else {
        const x1 = $( 2 );
        a = $( x1 );
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
