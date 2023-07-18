# Preval test case

# branched_write_read_update_after.md

> While > Branched write read update after
>
> A loop with a branch where a binding is updated in one side and read in another...

#TODO

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    // The write afterwards will always change x so the ++x cannot be observed here
    $(x, 'read');
  }
  x = $(10);
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, `write`);
  } else {
    $(x, `read`);
  }
  x = $(10);
}
`````

## Normalized

`````js filename=intro
let x = $(1);
while (true) {
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
  x = $(10);
}
`````

## Output

`````js filename=intro
const x = $(1);
const tmpIfTest = x % 2;
if (tmpIfTest) {
  const tmpClusterSSA_x = x + 1;
  $(tmpClusterSSA_x, `write`);
} else {
  $(x, `read`);
}
const tmpClusterSSA_x$1 = $(10);
const tmpIfTest$1 = tmpClusterSSA_x$1 % 2;
if (tmpIfTest$1) {
  const tmpClusterSSA_x$2 = tmpClusterSSA_x$1 + 1;
  $(tmpClusterSSA_x$2, `write`);
} else {
  $(tmpClusterSSA_x$1, `read`);
}
const tmpClusterSSA_x$4 = $(10);
const tmpIfTest$2 = tmpClusterSSA_x$4 % 2;
if (tmpIfTest$2) {
  const tmpClusterSSA_x$3 = tmpClusterSSA_x$4 + 1;
  $(tmpClusterSSA_x$3, `write`);
} else {
  $(tmpClusterSSA_x$4, `read`);
}
const tmpClusterSSA_x$5 = $(10);
const tmpIfTest$3 = tmpClusterSSA_x$5 % 2;
if (tmpIfTest$3) {
  const tmpClusterSSA_x$6 = tmpClusterSSA_x$5 + 1;
  $(tmpClusterSSA_x$6, `write`);
} else {
  $(tmpClusterSSA_x$5, `read`);
}
const tmpClusterSSA_x$8 = $(10);
const tmpIfTest$4 = tmpClusterSSA_x$8 % 2;
if (tmpIfTest$4) {
  const tmpClusterSSA_x$7 = tmpClusterSSA_x$8 + 1;
  $(tmpClusterSSA_x$7, `write`);
} else {
  $(tmpClusterSSA_x$8, `read`);
}
const tmpClusterSSA_x$9 = $(10);
const tmpIfTest$5 = tmpClusterSSA_x$9 % 2;
if (tmpIfTest$5) {
  const tmpClusterSSA_x$10 = tmpClusterSSA_x$9 + 1;
  $(tmpClusterSSA_x$10, `write`);
} else {
  $(tmpClusterSSA_x$9, `read`);
}
const tmpClusterSSA_x$12 = $(10);
const tmpIfTest$6 = tmpClusterSSA_x$12 % 2;
if (tmpIfTest$6) {
  const tmpClusterSSA_x$11 = tmpClusterSSA_x$12 + 1;
  $(tmpClusterSSA_x$11, `write`);
} else {
  $(tmpClusterSSA_x$12, `read`);
}
const tmpClusterSSA_x$13 = $(10);
const tmpIfTest$7 = tmpClusterSSA_x$13 % 2;
if (tmpIfTest$7) {
  const tmpClusterSSA_x$14 = tmpClusterSSA_x$13 + 1;
  $(tmpClusterSSA_x$14, `write`);
} else {
  $(tmpClusterSSA_x$13, `read`);
}
const tmpClusterSSA_x$16 = $(10);
const tmpIfTest$8 = tmpClusterSSA_x$16 % 2;
if (tmpIfTest$8) {
  const tmpClusterSSA_x$15 = tmpClusterSSA_x$16 + 1;
  $(tmpClusterSSA_x$15, `write`);
} else {
  $(tmpClusterSSA_x$16, `read`);
}
const tmpClusterSSA_x$17 = $(10);
const tmpIfTest$9 = tmpClusterSSA_x$17 % 2;
if (tmpIfTest$9) {
  const tmpClusterSSA_x$18 = tmpClusterSSA_x$17 + 1;
  $(tmpClusterSSA_x$18, `write`);
} else {
  $(tmpClusterSSA_x$17, `read`);
}
const tmpClusterSSA_x$20 = $(10);
const tmpIfTest$10 = tmpClusterSSA_x$20 % 2;
if (tmpIfTest$10) {
  const tmpClusterSSA_x$19 = tmpClusterSSA_x$20 + 1;
  $(tmpClusterSSA_x$19, `write`);
} else {
  $(tmpClusterSSA_x$20, `read`);
}
let tmpClusterSSA_x$21 = $(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$11 = tmpClusterSSA_x$21 % 2;
  if (tmpIfTest$11) {
    tmpClusterSSA_x$21 = tmpClusterSSA_x$21 + 1;
    $(tmpClusterSSA_x$21, `write`);
  } else {
    $(tmpClusterSSA_x$21, `read`);
  }
  tmpClusterSSA_x$21 = $(10);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
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
let 71 = $( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const 81 = 71 % 2;
  if (81) {
    71 = 71 + 1;
    $( 71, "write" );
  }
  else {
    $( 71, "read" );
  }
  71 = $( 10 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 'write'
 - 3: 10
 - 4: 10, 'read'
 - 5: 10
 - 6: 10, 'read'
 - 7: 10
 - 8: 10, 'read'
 - 9: 10
 - 10: 10, 'read'
 - 11: 10
 - 12: 10, 'read'
 - 13: 10
 - 14: 10, 'read'
 - 15: 10
 - 16: 10, 'read'
 - 17: 10
 - 18: 10, 'read'
 - 19: 10
 - 20: 10, 'read'
 - 21: 10
 - 22: 10, 'read'
 - 23: 10
 - 24: 10, 'read'
 - 25: 10
 - 26: 10, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
