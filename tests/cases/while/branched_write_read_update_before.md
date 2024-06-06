# Preval test case

# branched_write_read_update_before.md

> While > Branched write read update before
>
> A loop with a branch where a binding is updated in one side and read in another...

#TODO

## Input

`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  if (x % 2) {
    $(++x, 'write');
  } else {
    // The write before will always change x so the ++x cannot be observed here
    $(x, 'read');
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  if (x % 2) {
    $(++x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## Normalized


`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  const tmpIfTest = x % 2;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    x = x + 1;
    let tmpCalleeParam = x;
    const tmpCalleeParam$1 = `write`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    $(x, `read`);
  }
}
`````

## Output


`````js filename=intro
$(1);
const tmpClusterSSA_x = $(10);
const tmpIfTest = tmpClusterSSA_x % 2;
if (tmpIfTest) {
  const tmpClusterSSA_x$1 = tmpClusterSSA_x + 1;
  $(tmpClusterSSA_x$1, `write`);
} else {
  $(tmpClusterSSA_x, `read`);
}
const tmpClusterSSA_x$2 = $(10);
const tmpIfTest$1 = tmpClusterSSA_x$2 % 2;
if (tmpIfTest$1) {
  const tmpClusterSSA_x$4 = tmpClusterSSA_x$2 + 1;
  $(tmpClusterSSA_x$4, `write`);
} else {
  $(tmpClusterSSA_x$2, `read`);
}
const tmpClusterSSA_x$3 = $(10);
const tmpIfTest$2 = tmpClusterSSA_x$3 % 2;
if (tmpIfTest$2) {
  const tmpClusterSSA_x$5 = tmpClusterSSA_x$3 + 1;
  $(tmpClusterSSA_x$5, `write`);
} else {
  $(tmpClusterSSA_x$3, `read`);
}
const tmpClusterSSA_x$6 = $(10);
const tmpIfTest$3 = tmpClusterSSA_x$6 % 2;
if (tmpIfTest$3) {
  const tmpClusterSSA_x$8 = tmpClusterSSA_x$6 + 1;
  $(tmpClusterSSA_x$8, `write`);
} else {
  $(tmpClusterSSA_x$6, `read`);
}
const tmpClusterSSA_x$7 = $(10);
const tmpIfTest$4 = tmpClusterSSA_x$7 % 2;
if (tmpIfTest$4) {
  const tmpClusterSSA_x$9 = tmpClusterSSA_x$7 + 1;
  $(tmpClusterSSA_x$9, `write`);
} else {
  $(tmpClusterSSA_x$7, `read`);
}
const tmpClusterSSA_x$10 = $(10);
const tmpIfTest$5 = tmpClusterSSA_x$10 % 2;
if (tmpIfTest$5) {
  const tmpClusterSSA_x$12 = tmpClusterSSA_x$10 + 1;
  $(tmpClusterSSA_x$12, `write`);
} else {
  $(tmpClusterSSA_x$10, `read`);
}
const tmpClusterSSA_x$11 = $(10);
const tmpIfTest$6 = tmpClusterSSA_x$11 % 2;
if (tmpIfTest$6) {
  const tmpClusterSSA_x$13 = tmpClusterSSA_x$11 + 1;
  $(tmpClusterSSA_x$13, `write`);
} else {
  $(tmpClusterSSA_x$11, `read`);
}
const tmpClusterSSA_x$14 = $(10);
const tmpIfTest$7 = tmpClusterSSA_x$14 % 2;
if (tmpIfTest$7) {
  const tmpClusterSSA_x$16 = tmpClusterSSA_x$14 + 1;
  $(tmpClusterSSA_x$16, `write`);
} else {
  $(tmpClusterSSA_x$14, `read`);
}
const tmpClusterSSA_x$15 = $(10);
const tmpIfTest$8 = tmpClusterSSA_x$15 % 2;
if (tmpIfTest$8) {
  const tmpClusterSSA_x$17 = tmpClusterSSA_x$15 + 1;
  $(tmpClusterSSA_x$17, `write`);
} else {
  $(tmpClusterSSA_x$15, `read`);
}
const tmpClusterSSA_x$18 = $(10);
const tmpIfTest$9 = tmpClusterSSA_x$18 % 2;
if (tmpIfTest$9) {
  const tmpClusterSSA_x$20 = tmpClusterSSA_x$18 + 1;
  $(tmpClusterSSA_x$20, `write`);
} else {
  $(tmpClusterSSA_x$18, `read`);
}
const tmpClusterSSA_x$19 = $(10);
const tmpIfTest$10 = tmpClusterSSA_x$19 % 2;
if (tmpIfTest$10) {
  const tmpClusterSSA_x$21 = tmpClusterSSA_x$19 + 1;
  $(tmpClusterSSA_x$21, `write`);
} else {
  $(tmpClusterSSA_x$19, `read`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x$22 = $(10);
  const tmpIfTest$11 = tmpClusterSSA_x$22 % 2;
  if (tmpIfTest$11) {
    const tmpClusterSSA_x$24 = tmpClusterSSA_x$22 + 1;
    $(tmpClusterSSA_x$24, `write`);
  } else {
    $(tmpClusterSSA_x$22, `read`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
const b = a % 2;
if (b) {
  const c = a + 1;
  $( c, "write" );
}
else {
  $( a, "read" );
}
const d = $( 10 );
const e = d % 2;
if (e) {
  const f = d + 1;
  $( f, "write" );
}
else {
  $( d, "read" );
}
const g = $( 10 );
const h = g % 2;
if (h) {
  const i = g + 1;
  $( i, "write" );
}
else {
  $( g, "read" );
}
const j = $( 10 );
const k = j % 2;
if (k) {
  const l = j + 1;
  $( l, "write" );
}
else {
  $( j, "read" );
}
const m = $( 10 );
const n = m % 2;
if (n) {
  const o = m + 1;
  $( o, "write" );
}
else {
  $( m, "read" );
}
const p = $( 10 );
const q = p % 2;
if (q) {
  const r = p + 1;
  $( r, "write" );
}
else {
  $( p, "read" );
}
const s = $( 10 );
const t = s % 2;
if (t) {
  const u = s + 1;
  $( u, "write" );
}
else {
  $( s, "read" );
}
const v = $( 10 );
const w = v % 2;
if (w) {
  const x = v + 1;
  $( x, "write" );
}
else {
  $( v, "read" );
}
const y = $( 10 );
const z = y % 2;
if (z) {
  const 01 = y + 1;
  $( 01, "write" );
}
else {
  $( y, "read" );
}
const 11 = $( 10 );
const 21 = 11 % 2;
if (21) {
  const 31 = 11 + 1;
  $( 31, "write" );
}
else {
  $( 11, "read" );
}
const 41 = $( 10 );
const 51 = 41 % 2;
if (51) {
  const 61 = 41 + 1;
  $( 61, "write" );
}
else {
  $( 41, "read" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const 71 = $( 10 );
  const 81 = 71 % 2;
  if (81) {
    const 91 = 71 + 1;
    $( 91, "write" );
  }
  else {
    $( 71, "read" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 10, 'read'
 - 4: 10
 - 5: 10, 'read'
 - 6: 10
 - 7: 10, 'read'
 - 8: 10
 - 9: 10, 'read'
 - 10: 10
 - 11: 10, 'read'
 - 12: 10
 - 13: 10, 'read'
 - 14: 10
 - 15: 10, 'read'
 - 16: 10
 - 17: 10, 'read'
 - 18: 10
 - 19: 10, 'read'
 - 20: 10
 - 21: 10, 'read'
 - 22: 10
 - 23: 10, 'read'
 - 24: 10
 - 25: 10, 'read'
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
