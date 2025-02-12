# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > While > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || ($($(1)) && $($(2))))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || ($($(1)) && $($(2))))) $(100);
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
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
loopStop: {
  const tmpCalleeParam = $(0);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$2 = $(0);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
  if (tmpClusterSSA_a$1) {
    $(100);
  } else {
    const tmpCalleeParam$4 = $(1);
    a = $(tmpCalleeParam$4);
    if (a) {
      const tmpCalleeParam$6 = $(2);
      a = $(tmpCalleeParam$6);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$5 = $(0);
  const tmpClusterSSA_a$2 = $(tmpCalleeParam$5);
  if (tmpClusterSSA_a$2) {
    $(100);
  } else {
    const tmpCalleeParam$7 = $(1);
    a = $(tmpCalleeParam$7);
    if (a) {
      const tmpCalleeParam$9 = $(2);
      a = $(tmpCalleeParam$9);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$8 = $(0);
  const tmpClusterSSA_a$3 = $(tmpCalleeParam$8);
  if (tmpClusterSSA_a$3) {
    $(100);
  } else {
    const tmpCalleeParam$10 = $(1);
    a = $(tmpCalleeParam$10);
    if (a) {
      const tmpCalleeParam$12 = $(2);
      a = $(tmpCalleeParam$12);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$11 = $(0);
  const tmpClusterSSA_a$4 = $(tmpCalleeParam$11);
  if (tmpClusterSSA_a$4) {
    $(100);
  } else {
    const tmpCalleeParam$13 = $(1);
    a = $(tmpCalleeParam$13);
    if (a) {
      const tmpCalleeParam$15 = $(2);
      a = $(tmpCalleeParam$15);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$14 = $(0);
  const tmpClusterSSA_a$5 = $(tmpCalleeParam$14);
  if (tmpClusterSSA_a$5) {
    $(100);
  } else {
    const tmpCalleeParam$16 = $(1);
    a = $(tmpCalleeParam$16);
    if (a) {
      const tmpCalleeParam$18 = $(2);
      a = $(tmpCalleeParam$18);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$17 = $(0);
  const tmpClusterSSA_a$6 = $(tmpCalleeParam$17);
  if (tmpClusterSSA_a$6) {
    $(100);
  } else {
    const tmpCalleeParam$19 = $(1);
    a = $(tmpCalleeParam$19);
    if (a) {
      const tmpCalleeParam$21 = $(2);
      a = $(tmpCalleeParam$21);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$20 = $(0);
  const tmpClusterSSA_a$7 = $(tmpCalleeParam$20);
  if (tmpClusterSSA_a$7) {
    $(100);
  } else {
    const tmpCalleeParam$22 = $(1);
    a = $(tmpCalleeParam$22);
    if (a) {
      const tmpCalleeParam$24 = $(2);
      a = $(tmpCalleeParam$24);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$23 = $(0);
  const tmpClusterSSA_a$8 = $(tmpCalleeParam$23);
  if (tmpClusterSSA_a$8) {
    $(100);
  } else {
    const tmpCalleeParam$25 = $(1);
    a = $(tmpCalleeParam$25);
    if (a) {
      const tmpCalleeParam$27 = $(2);
      a = $(tmpCalleeParam$27);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$26 = $(0);
  const tmpClusterSSA_a$9 = $(tmpCalleeParam$26);
  if (tmpClusterSSA_a$9) {
    $(100);
  } else {
    const tmpCalleeParam$28 = $(1);
    a = $(tmpCalleeParam$28);
    if (a) {
      const tmpCalleeParam$30 = $(2);
      a = $(tmpCalleeParam$30);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  const tmpCalleeParam$29 = $(0);
  const tmpClusterSSA_a$10 = $(tmpCalleeParam$29);
  if (tmpClusterSSA_a$10) {
    $(100);
  } else {
    const tmpCalleeParam$31 = $(1);
    a = $(tmpCalleeParam$31);
    if (a) {
      const tmpCalleeParam$33 = $(2);
      a = $(tmpCalleeParam$33);
      if (a) {
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
    const tmpClusterSSA_a$11 = $(tmpCalleeParam$32);
    if (tmpClusterSSA_a$11) {
      $(100);
    } else {
      const tmpCalleeParam$34 = $(1);
      a = $(tmpCalleeParam$34);
      if (a) {
        const tmpCalleeParam$36 = $(2);
        a = $(tmpCalleeParam$36);
        if (a) {
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
    $( 100 );
  }
  else {
    const d = $( 1 );
    a = $( d );
    if (a) {
      const e = $( 2 );
      a = $( e );
      if (a) {
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
  const f = $( 0 );
  const g = $( f );
  if (g) {
    $( 100 );
  }
  else {
    const h = $( 1 );
    a = $( h );
    if (a) {
      const i = $( 2 );
      a = $( i );
      if (a) {
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
  const j = $( 0 );
  const k = $( j );
  if (k) {
    $( 100 );
  }
  else {
    const l = $( 1 );
    a = $( l );
    if (a) {
      const m = $( 2 );
      a = $( m );
      if (a) {
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
  const n = $( 0 );
  const o = $( n );
  if (o) {
    $( 100 );
  }
  else {
    const p = $( 1 );
    a = $( p );
    if (a) {
      const q = $( 2 );
      a = $( q );
      if (a) {
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
  const r = $( 0 );
  const s = $( r );
  if (s) {
    $( 100 );
  }
  else {
    const t = $( 1 );
    a = $( t );
    if (a) {
      const u = $( 2 );
      a = $( u );
      if (a) {
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
  const v = $( 0 );
  const w = $( v );
  if (w) {
    $( 100 );
  }
  else {
    const x = $( 1 );
    a = $( x );
    if (a) {
      const y = $( 2 );
      a = $( y );
      if (a) {
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
  const z = $( 0 );
  const ba = $( z );
  if (ba) {
    $( 100 );
  }
  else {
    const bb = $( 1 );
    a = $( bb );
    if (a) {
      const bc = $( 2 );
      a = $( bc );
      if (a) {
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
  const bd = $( 0 );
  const be = $( bd );
  if (be) {
    $( 100 );
  }
  else {
    const bf = $( 1 );
    a = $( bf );
    if (a) {
      const bg = $( 2 );
      a = $( bg );
      if (a) {
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
  const bh = $( 0 );
  const bi = $( bh );
  if (bi) {
    $( 100 );
  }
  else {
    const bj = $( 1 );
    a = $( bj );
    if (a) {
      const bk = $( 2 );
      a = $( bk );
      if (a) {
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
  const bl = $( 0 );
  const bm = $( bl );
  if (bm) {
    $( 100 );
  }
  else {
    const bn = $( 1 );
    a = $( bn );
    if (a) {
      const bo = $( 2 );
      a = $( bo );
      if (a) {
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
  const bp = $( 0 );
  const bq = $( bp );
  if (bq) {
    $( 100 );
  }
  else {
    const br = $( 1 );
    a = $( br );
    if (a) {
      const bs = $( 2 );
      a = $( bs );
      if (a) {
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
    const bt = $( 0 );
    const bu = $( bt );
    if (bu) {
      $( 100 );
    }
    else {
      const bv = $( 1 );
      a = $( bv );
      if (a) {
        const bw = $( 2 );
        a = $( bw );
        if (a) {
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
$( a );
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
