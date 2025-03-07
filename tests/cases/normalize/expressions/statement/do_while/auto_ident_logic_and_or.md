# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Settled


`````js filename=intro
loopStop: {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$2 /*:unknown*/ = $(1);
  let tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
    const tmpCalleeParam$4 /*:unknown*/ = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$6 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$6);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  let tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpIfTest$2) {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    tmpIfTest$2 = $(tmpCalleeParam$7);
  } else {
  }
  if (tmpIfTest$2) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$2 /*:unknown*/ = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpIfTest$2) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$8 /*:unknown*/ = $(1);
  let tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$8);
  if (tmpIfTest$3) {
    const tmpCalleeParam$10 /*:unknown*/ = $(1);
    tmpIfTest$3 = $(tmpCalleeParam$10);
  } else {
  }
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$12 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$12);
    if (tmpClusterSSA_tmpIfTest$3) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$11 /*:unknown*/ = $(1);
  let tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$11);
  if (tmpIfTest$4) {
    const tmpCalleeParam$13 /*:unknown*/ = $(1);
    tmpIfTest$4 = $(tmpCalleeParam$13);
  } else {
  }
  if (tmpIfTest$4) {
  } else {
    const tmpCalleeParam$15 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$4 /*:unknown*/ = $(tmpCalleeParam$15);
    if (tmpClusterSSA_tmpIfTest$4) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$14 /*:unknown*/ = $(1);
  let tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$14);
  if (tmpIfTest$5) {
    const tmpCalleeParam$16 /*:unknown*/ = $(1);
    tmpIfTest$5 = $(tmpCalleeParam$16);
  } else {
  }
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$18 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$18);
    if (tmpClusterSSA_tmpIfTest$5) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$17 /*:unknown*/ = $(1);
  let tmpIfTest$6 /*:unknown*/ = $(tmpCalleeParam$17);
  if (tmpIfTest$6) {
    const tmpCalleeParam$19 /*:unknown*/ = $(1);
    tmpIfTest$6 = $(tmpCalleeParam$19);
  } else {
  }
  if (tmpIfTest$6) {
  } else {
    const tmpCalleeParam$21 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$6 /*:unknown*/ = $(tmpCalleeParam$21);
    if (tmpClusterSSA_tmpIfTest$6) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$20 /*:unknown*/ = $(1);
  let tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$20);
  if (tmpIfTest$7) {
    const tmpCalleeParam$22 /*:unknown*/ = $(1);
    tmpIfTest$7 = $(tmpCalleeParam$22);
  } else {
  }
  if (tmpIfTest$7) {
  } else {
    const tmpCalleeParam$24 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$24);
    if (tmpClusterSSA_tmpIfTest$7) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$23 /*:unknown*/ = $(1);
  let tmpIfTest$8 /*:unknown*/ = $(tmpCalleeParam$23);
  if (tmpIfTest$8) {
    const tmpCalleeParam$25 /*:unknown*/ = $(1);
    tmpIfTest$8 = $(tmpCalleeParam$25);
  } else {
  }
  if (tmpIfTest$8) {
  } else {
    const tmpCalleeParam$27 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$8 /*:unknown*/ = $(tmpCalleeParam$27);
    if (tmpClusterSSA_tmpIfTest$8) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$26 /*:unknown*/ = $(1);
  let tmpIfTest$9 /*:unknown*/ = $(tmpCalleeParam$26);
  if (tmpIfTest$9) {
    const tmpCalleeParam$28 /*:unknown*/ = $(1);
    tmpIfTest$9 = $(tmpCalleeParam$28);
  } else {
  }
  if (tmpIfTest$9) {
  } else {
    const tmpCalleeParam$30 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$9 /*:unknown*/ = $(tmpCalleeParam$30);
    if (tmpClusterSSA_tmpIfTest$9) {
    } else {
      break loopStop;
    }
  }
  $(100);
  const tmpCalleeParam$29 /*:unknown*/ = $(1);
  let tmpIfTest$10 /*:unknown*/ = $(tmpCalleeParam$29);
  if (tmpIfTest$10) {
    const tmpCalleeParam$31 /*:unknown*/ = $(1);
    tmpIfTest$10 = $(tmpCalleeParam$31);
  } else {
  }
  if (tmpIfTest$10) {
  } else {
    const tmpCalleeParam$33 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$10 /*:unknown*/ = $(tmpCalleeParam$33);
    if (tmpClusterSSA_tmpIfTest$10) {
    } else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const tmpCalleeParam$32 /*:unknown*/ = $(1);
    let tmpIfTest$11 /*:unknown*/ = $(tmpCalleeParam$32);
    if (tmpIfTest$11) {
      const tmpCalleeParam$34 /*:unknown*/ = $(1);
      tmpIfTest$11 = $(tmpCalleeParam$34);
    } else {
    }
    if (tmpIfTest$11) {
    } else {
      const tmpCalleeParam$36 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmpIfTest$11 /*:unknown*/ = $(tmpCalleeParam$36);
      if (tmpClusterSSA_tmpIfTest$11) {
      } else {
        break;
      }
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
loopStop: {
  $(100);
  let tmpIfTest = $($(1));
  if (tmpIfTest) {
    tmpIfTest = $($(1));
  }
  if (!tmpIfTest) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$1 = $($(1));
  if (tmpIfTest$1) {
    tmpIfTest$1 = $($(1));
  }
  if (!tmpIfTest$1) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$2 = $($(1));
  if (tmpIfTest$2) {
    tmpIfTest$2 = $($(1));
  }
  if (!tmpIfTest$2) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$3 = $($(1));
  if (tmpIfTest$3) {
    tmpIfTest$3 = $($(1));
  }
  if (!tmpIfTest$3) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$4 = $($(1));
  if (tmpIfTest$4) {
    tmpIfTest$4 = $($(1));
  }
  if (!tmpIfTest$4) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$5 = $($(1));
  if (tmpIfTest$5) {
    tmpIfTest$5 = $($(1));
  }
  if (!tmpIfTest$5) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$6 = $($(1));
  if (tmpIfTest$6) {
    tmpIfTest$6 = $($(1));
  }
  if (!tmpIfTest$6) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$7 = $($(1));
  if (tmpIfTest$7) {
    tmpIfTest$7 = $($(1));
  }
  if (!tmpIfTest$7) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$8 = $($(1));
  if (tmpIfTest$8) {
    tmpIfTest$8 = $($(1));
  }
  if (!tmpIfTest$8) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$9 = $($(1));
  if (tmpIfTest$9) {
    tmpIfTest$9 = $($(1));
  }
  if (!tmpIfTest$9) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  $(100);
  let tmpIfTest$10 = $($(1));
  if (tmpIfTest$10) {
    tmpIfTest$10 = $($(1));
  }
  if (!tmpIfTest$10) {
    if (!$($(2))) {
      break loopStop;
    }
  }
  while (true) {
    $(100);
    let tmpIfTest$11 = $($(1));
    if (tmpIfTest$11) {
      tmpIfTest$11 = $($(1));
    }
    if (!tmpIfTest$11) {
      if (!$($(2))) {
        break;
      }
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($($(1)) && $($(1))) || $($(2))) {
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
  const tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
loopStop: {
  $( 100 );
  const a = $( 1 );
  let b = $( a );
  if (b) {
    const c = $( 1 );
    b = $( c );
  }
  if (b) {

  }
  else {
    const d = $( 2 );
    const e = $( d );
    if (e) {

    }
    else {
      break loopStop;
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
    const j = $( i );
    if (j) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const k = $( 1 );
  let l = $( k );
  if (l) {
    const m = $( 1 );
    l = $( m );
  }
  if (l) {

  }
  else {
    const n = $( 2 );
    const o = $( n );
    if (o) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const p = $( 1 );
  let q = $( p );
  if (q) {
    const r = $( 1 );
    q = $( r );
  }
  if (q) {

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
  const u = $( 1 );
  let v = $( u );
  if (v) {
    const w = $( 1 );
    v = $( w );
  }
  if (v) {

  }
  else {
    const x = $( 2 );
    const y = $( x );
    if (y) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const z = $( 1 );
  let ba = $( z );
  if (ba) {
    const bb = $( 1 );
    ba = $( bb );
  }
  if (ba) {

  }
  else {
    const bc = $( 2 );
    const bd = $( bc );
    if (bd) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const be = $( 1 );
  let bf = $( be );
  if (bf) {
    const bg = $( 1 );
    bf = $( bg );
  }
  if (bf) {

  }
  else {
    const bh = $( 2 );
    const bi = $( bh );
    if (bi) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bj = $( 1 );
  let bk = $( bj );
  if (bk) {
    const bl = $( 1 );
    bk = $( bl );
  }
  if (bk) {

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
  const bo = $( 1 );
  let bp = $( bo );
  if (bp) {
    const bq = $( 1 );
    bp = $( bq );
  }
  if (bp) {

  }
  else {
    const br = $( 2 );
    const bs = $( br );
    if (bs) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const bt = $( 1 );
  let bu = $( bt );
  if (bu) {
    const bv = $( 1 );
    bu = $( bv );
  }
  if (bu) {

  }
  else {
    const bw = $( 2 );
    const bx = $( bw );
    if (bx) {

    }
    else {
      break loopStop;
    }
  }
  $( 100 );
  const by = $( 1 );
  let bz = $( by );
  if (bz) {
    const ca = $( 1 );
    bz = $( ca );
  }
  if (bz) {

  }
  else {
    const cb = $( 2 );
    const cc = $( cb );
    if (cc) {

    }
    else {
      break loopStop;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const cd = $( 1 );
    let ce = $( cd );
    if (ce) {
      const cf = $( 1 );
      ce = $( cf );
    }
    if (ce) {

    }
    else {
      const cg = $( 2 );
      const ch = $( cg );
      if (ch) {

      }
      else {
        break;
      }
    }
  }
}
const ci = {
  a: 999,
  b: 1000,
};
$( ci );
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same
