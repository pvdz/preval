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
const x = $(10);
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
let tmpClusterSSA_x$20 = $(10);
const tmpIfTest$10 = tmpClusterSSA_x$20 % 2;
if (tmpIfTest$10) {
  tmpClusterSSA_x$20 = tmpClusterSSA_x$20 + 1;
  $(tmpClusterSSA_x$20, `write`);
} else {
  $(tmpClusterSSA_x$20, `read`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpClusterSSA_x$20 = $(10);
  const tmpIfTest$11 = tmpClusterSSA_x$20 % 2;
  if (tmpIfTest$11) {
    tmpClusterSSA_x$20 = tmpClusterSSA_x$20 + 1;
    $(tmpClusterSSA_x$20, `write`);
  } else {
    $(tmpClusterSSA_x$20, `read`);
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
let 41 = $( 10 );
const 51 = 41 % 2;
if (51) {
  41 = 41 + 1;
  $( 41, "write" );
}
else {
  $( 41, "read" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  41 = $( 10 );
  const 61 = 41 % 2;
  if (61) {
    41 = 41 + 1;
    $( 41, "write" );
  }
  else {
    $( 41, "read" );
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
