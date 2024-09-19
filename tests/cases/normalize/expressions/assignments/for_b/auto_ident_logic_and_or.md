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
loopStop: {
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
loopStop: {
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
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
      break loopStop;
    }
  }
  const z = $( 1 );
  let ba = $( z );
  if (ba) {
    const bb = $( 1 );
    ba = $( bb );
  }
  if (ba) {
    $( 1 );
  }
  else {
    const bc = $( 2 );
    a = $( bc );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const bd = $( 1 );
  let be = $( bd );
  if (be) {
    const bf = $( 1 );
    be = $( bf );
  }
  if (be) {
    $( 1 );
  }
  else {
    const bg = $( 2 );
    a = $( bg );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const bh = $( 1 );
  let bi = $( bh );
  if (bi) {
    const bj = $( 1 );
    bi = $( bj );
  }
  if (bi) {
    $( 1 );
  }
  else {
    const bk = $( 2 );
    a = $( bk );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const bl = $( 1 );
  let bm = $( bl );
  if (bm) {
    const bn = $( 1 );
    bm = $( bn );
  }
  if (bm) {
    $( 1 );
  }
  else {
    const bo = $( 2 );
    a = $( bo );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  const bp = $( 1 );
  let bq = $( bp );
  if (bq) {
    const br = $( 1 );
    bq = $( br );
  }
  if (bq) {
    $( 1 );
  }
  else {
    const bs = $( 2 );
    a = $( bs );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const bt = $( 1 );
    let bu = $( bt );
    if (bu) {
      const bv = $( 1 );
      bu = $( bv );
    }
    if (bu) {
      $( 1 );
    }
    else {
      const bw = $( 2 );
      a = $( bw );
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
