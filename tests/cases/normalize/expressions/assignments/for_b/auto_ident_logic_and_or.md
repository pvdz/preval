# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > For b > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = ($($(1)) && $($(1))) || $($(2))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = ($($(1)) && $($(1))) || $($(2)))) {
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
    $(1);
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
  const tmpCalleeParam = $(1);
  let tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$1 = $(1);
    tmpClusterSSA_a = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpClusterSSA_a) {
    $(1);
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$2 = $(1);
  let tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$4 = $(1);
    tmpClusterSSA_a$1 = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpClusterSSA_a$1) {
    $(1);
  } else {
    const tmpCalleeParam$6 = $(2);
    a = $(tmpCalleeParam$6);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$5 = $(1);
  let tmpClusterSSA_a$2 = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$2) {
    const tmpCalleeParam$7 = $(1);
    tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpClusterSSA_a$2) {
    $(1);
  } else {
    const tmpCalleeParam$9 = $(2);
    a = $(tmpCalleeParam$9);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$8 = $(1);
  let tmpClusterSSA_a$3 = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$3) {
    const tmpCalleeParam$10 = $(1);
    tmpClusterSSA_a$3 = $(tmpCalleeParam$10);
  } else {
  }
  if (tmpClusterSSA_a$3) {
    $(1);
  } else {
    const tmpCalleeParam$12 = $(2);
    a = $(tmpCalleeParam$12);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$11 = $(1);
  let tmpClusterSSA_a$4 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$4) {
    const tmpCalleeParam$13 = $(1);
    tmpClusterSSA_a$4 = $(tmpCalleeParam$13);
  } else {
  }
  if (tmpClusterSSA_a$4) {
    $(1);
  } else {
    const tmpCalleeParam$15 = $(2);
    a = $(tmpCalleeParam$15);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$14 = $(1);
  let tmpClusterSSA_a$5 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$5) {
    const tmpCalleeParam$16 = $(1);
    tmpClusterSSA_a$5 = $(tmpCalleeParam$16);
  } else {
  }
  if (tmpClusterSSA_a$5) {
    $(1);
  } else {
    const tmpCalleeParam$18 = $(2);
    a = $(tmpCalleeParam$18);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$17 = $(1);
  let tmpClusterSSA_a$6 = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$6) {
    const tmpCalleeParam$19 = $(1);
    tmpClusterSSA_a$6 = $(tmpCalleeParam$19);
  } else {
  }
  if (tmpClusterSSA_a$6) {
    $(1);
  } else {
    const tmpCalleeParam$21 = $(2);
    a = $(tmpCalleeParam$21);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$20 = $(1);
  let tmpClusterSSA_a$7 = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$7) {
    const tmpCalleeParam$22 = $(1);
    tmpClusterSSA_a$7 = $(tmpCalleeParam$22);
  } else {
  }
  if (tmpClusterSSA_a$7) {
    $(1);
  } else {
    const tmpCalleeParam$24 = $(2);
    a = $(tmpCalleeParam$24);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$23 = $(1);
  let tmpClusterSSA_a$8 = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$8) {
    const tmpCalleeParam$25 = $(1);
    tmpClusterSSA_a$8 = $(tmpCalleeParam$25);
  } else {
  }
  if (tmpClusterSSA_a$8) {
    $(1);
  } else {
    const tmpCalleeParam$27 = $(2);
    a = $(tmpCalleeParam$27);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$26 = $(1);
  let tmpClusterSSA_a$9 = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$9) {
    const tmpCalleeParam$28 = $(1);
    tmpClusterSSA_a$9 = $(tmpCalleeParam$28);
  } else {
  }
  if (tmpClusterSSA_a$9) {
    $(1);
  } else {
    const tmpCalleeParam$30 = $(2);
    a = $(tmpCalleeParam$30);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  const tmpCalleeParam$29 = $(1);
  let tmpClusterSSA_a$10 = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$10) {
    const tmpCalleeParam$31 = $(1);
    tmpClusterSSA_a$10 = $(tmpCalleeParam$31);
  } else {
  }
  if (tmpClusterSSA_a$10) {
    $(1);
  } else {
    const tmpCalleeParam$33 = $(2);
    a = $(tmpCalleeParam$33);
    if (a) {
      $(1);
    } else {
      break loopStop$2;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$32 = $(1);
    let tmpClusterSSA_a$11 = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$11) {
      const tmpCalleeParam$34 = $(1);
      tmpClusterSSA_a$11 = $(tmpCalleeParam$34);
    } else {
    }
    if (tmpClusterSSA_a$11) {
      $(1);
    } else {
      const tmpCalleeParam$36 = $(2);
      a = $(tmpCalleeParam$36);
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
let a = 1;
loopStop$2: {
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {
    $( 1 );
  }
  else {
    const e = $( 2 );
    a = $( e );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 1 );
    g = $( h );
  }
  if (g) {
    $( 1 );
  }
  else {
    const i = $( 2 );
    a = $( i );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const j = $( 1 );
  let k = $( j );
  if (k) {
    const l = $( 1 );
    k = $( l );
  }
  if (k) {
    $( 1 );
  }
  else {
    const m = $( 2 );
    a = $( m );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const n = $( 1 );
  let o = $( n );
  if (o) {
    const p = $( 1 );
    o = $( p );
  }
  if (o) {
    $( 1 );
  }
  else {
    const q = $( 2 );
    a = $( q );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const r = $( 1 );
  let s = $( r );
  if (s) {
    const t = $( 1 );
    s = $( t );
  }
  if (s) {
    $( 1 );
  }
  else {
    const u = $( 2 );
    a = $( u );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const v = $( 1 );
  let w = $( v );
  if (w) {
    const x = $( 1 );
    w = $( x );
  }
  if (w) {
    $( 1 );
  }
  else {
    const y = $( 2 );
    a = $( y );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const z = $( 1 );
  let 01 = $( z );
  if (01) {
    const 11 = $( 1 );
    01 = $( 11 );
  }
  if (01) {
    $( 1 );
  }
  else {
    const 21 = $( 2 );
    a = $( 21 );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const 31 = $( 1 );
  let 41 = $( 31 );
  if (41) {
    const 51 = $( 1 );
    41 = $( 51 );
  }
  if (41) {
    $( 1 );
  }
  else {
    const 61 = $( 2 );
    a = $( 61 );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const 71 = $( 1 );
  let 81 = $( 71 );
  if (81) {
    const 91 = $( 1 );
    81 = $( 91 );
  }
  if (81) {
    $( 1 );
  }
  else {
    const a1 = $( 2 );
    a = $( a1 );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const b1 = $( 1 );
  let c1 = $( b1 );
  if (c1) {
    const d1 = $( 1 );
    c1 = $( d1 );
  }
  if (c1) {
    $( 1 );
  }
  else {
    const e1 = $( 2 );
    a = $( e1 );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  const f1 = $( 1 );
  let g1 = $( f1 );
  if (g1) {
    const h1 = $( 1 );
    g1 = $( h1 );
  }
  if (g1) {
    $( 1 );
  }
  else {
    const i1 = $( 2 );
    a = $( i1 );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop$2;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const j1 = $( 1 );
    let k1 = $( j1 );
    if (k1) {
      const l1 = $( 1 );
      k1 = $( l1 );
    }
    if (k1) {
      $( 1 );
    }
    else {
      const m1 = $( 2 );
      a = $( m1 );
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
