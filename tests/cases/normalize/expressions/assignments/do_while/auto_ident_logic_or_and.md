# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || ($($(1)) && $($(2))))) {
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
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    } else {
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
let a /*:unknown*/ = undefined;
loopStop: {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$2 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
  } else {
    const tmpCalleeParam$4 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$4);
    if (a) {
      const tmpCalleeParam$6 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$5 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$2) {
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$7);
    if (a) {
      const tmpCalleeParam$9 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$8 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$3) {
  } else {
    const tmpCalleeParam$10 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$10);
    if (a) {
      const tmpCalleeParam$12 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$11 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$4) {
  } else {
    const tmpCalleeParam$13 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$13);
    if (a) {
      const tmpCalleeParam$15 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$14 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$5 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$5) {
  } else {
    const tmpCalleeParam$16 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$16);
    if (a) {
      const tmpCalleeParam$18 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$17 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$6 /*:unknown*/ = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$6) {
  } else {
    const tmpCalleeParam$19 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$19);
    if (a) {
      const tmpCalleeParam$21 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$20 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$7 /*:unknown*/ = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$7) {
  } else {
    const tmpCalleeParam$22 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$22);
    if (a) {
      const tmpCalleeParam$24 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$23 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$8 /*:unknown*/ = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$8) {
  } else {
    const tmpCalleeParam$25 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$25);
    if (a) {
      const tmpCalleeParam$27 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$26 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$9 /*:unknown*/ = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$9) {
  } else {
    const tmpCalleeParam$28 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$28);
    if (a) {
      const tmpCalleeParam$30 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$29 /*:unknown*/ = $(0);
  const tmpClusterSSA_a$10 /*:unknown*/ = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$10) {
  } else {
    const tmpCalleeParam$31 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$31);
    if (a) {
      const tmpCalleeParam$33 /*:unknown*/ = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 /*:unknown*/ = $(0);
    const tmpClusterSSA_a$11 /*:unknown*/ = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$11) {
    } else {
      const tmpCalleeParam$34 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$34);
      if (a) {
        const tmpCalleeParam$36 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$36);
        if (a) {
        } else {
          break;
        }
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
    const d = $( 1 );
    a = $( d );
    if (a) {
      const e = $( 2 );
      a = $( e );
      if (a) {

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
  const f = $( 0 );
  const g = $( f );
  if (g) {

  }
  else {
    const h = $( 1 );
    a = $( h );
    if (a) {
      const i = $( 2 );
      a = $( i );
      if (a) {

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
  const j = $( 0 );
  const k = $( j );
  if (k) {

  }
  else {
    const l = $( 1 );
    a = $( l );
    if (a) {
      const m = $( 2 );
      a = $( m );
      if (a) {

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
  const n = $( 0 );
  const o = $( n );
  if (o) {

  }
  else {
    const p = $( 1 );
    a = $( p );
    if (a) {
      const q = $( 2 );
      a = $( q );
      if (a) {

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
  const r = $( 0 );
  const s = $( r );
  if (s) {

  }
  else {
    const t = $( 1 );
    a = $( t );
    if (a) {
      const u = $( 2 );
      a = $( u );
      if (a) {

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
  const v = $( 0 );
  const w = $( v );
  if (w) {

  }
  else {
    const x = $( 1 );
    a = $( x );
    if (a) {
      const y = $( 2 );
      a = $( y );
      if (a) {

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
  const z = $( 0 );
  const ba = $( z );
  if (ba) {

  }
  else {
    const bb = $( 1 );
    a = $( bb );
    if (a) {
      const bc = $( 2 );
      a = $( bc );
      if (a) {

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
  const bd = $( 0 );
  const be = $( bd );
  if (be) {

  }
  else {
    const bf = $( 1 );
    a = $( bf );
    if (a) {
      const bg = $( 2 );
      a = $( bg );
      if (a) {

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
  const bh = $( 0 );
  const bi = $( bh );
  if (bi) {

  }
  else {
    const bj = $( 1 );
    a = $( bj );
    if (a) {
      const bk = $( 2 );
      a = $( bk );
      if (a) {

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
  const bl = $( 0 );
  const bm = $( bl );
  if (bm) {

  }
  else {
    const bn = $( 1 );
    a = $( bn );
    if (a) {
      const bo = $( 2 );
      a = $( bo );
      if (a) {

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
  const bp = $( 0 );
  const bq = $( bp );
  if (bq) {

  }
  else {
    const br = $( 1 );
    a = $( br );
    if (a) {
      const bs = $( 2 );
      a = $( bs );
      if (a) {

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
    const bt = $( 0 );
    const bu = $( bt );
    if (bu) {

    }
    else {
      const bv = $( 1 );
      a = $( bv );
      if (a) {
        const bw = $( 2 );
        a = $( bw );
        if (a) {

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
