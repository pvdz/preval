# Preval test case

# branched_write_read_cond_update_before.md

> While > Branched write read cond update before
>
> A loop with a branch where a binding is updated in one side and read in another...

#TODO

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 3) x = $(10, 'ten');
  if (x % 2) {
    $(++x, 'write');
  } else {
    // Since the 10-write may not happen, this read may observe the ++x
    $(x, 'read');
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 3) x = $(10, `ten`);
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
  const tmpIfTest = x % 3;
  if (tmpIfTest) {
    x = $(10, `ten`);
  } else {
  }
  const tmpIfTest$1 = x % 2;
  if (tmpIfTest$1) {
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
let x = $(1);
const tmpIfTest = x % 3;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  x = $(10, `ten`);
  tmpIfTest$1 = x % 2;
} else {
  tmpIfTest$1 = x % 2;
}
if (tmpIfTest$1) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$2 = x % 3;
let tmpIfTest$4 = false;
if (tmpIfTest$2) {
  x = $(10, `ten`);
  tmpIfTest$4 = x % 2;
} else {
  tmpIfTest$4 = x % 2;
}
if (tmpIfTest$4) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$3 = x % 3;
let tmpIfTest$5 = false;
if (tmpIfTest$3) {
  x = $(10, `ten`);
  tmpIfTest$5 = x % 2;
} else {
  tmpIfTest$5 = x % 2;
}
if (tmpIfTest$5) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$6 = x % 3;
let tmpIfTest$8 = false;
if (tmpIfTest$6) {
  x = $(10, `ten`);
  tmpIfTest$8 = x % 2;
} else {
  tmpIfTest$8 = x % 2;
}
if (tmpIfTest$8) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$7 = x % 3;
let tmpIfTest$9 = false;
if (tmpIfTest$7) {
  x = $(10, `ten`);
  tmpIfTest$9 = x % 2;
} else {
  tmpIfTest$9 = x % 2;
}
if (tmpIfTest$9) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$10 = x % 3;
let tmpIfTest$12 = false;
if (tmpIfTest$10) {
  x = $(10, `ten`);
  tmpIfTest$12 = x % 2;
} else {
  tmpIfTest$12 = x % 2;
}
if (tmpIfTest$12) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$11 = x % 3;
let tmpIfTest$13 = false;
if (tmpIfTest$11) {
  x = $(10, `ten`);
  tmpIfTest$13 = x % 2;
} else {
  tmpIfTest$13 = x % 2;
}
if (tmpIfTest$13) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$14 = x % 3;
let tmpIfTest$16 = false;
if (tmpIfTest$14) {
  x = $(10, `ten`);
  tmpIfTest$16 = x % 2;
} else {
  tmpIfTest$16 = x % 2;
}
if (tmpIfTest$16) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$15 = x % 3;
let tmpIfTest$17 = false;
if (tmpIfTest$15) {
  x = $(10, `ten`);
  tmpIfTest$17 = x % 2;
} else {
  tmpIfTest$17 = x % 2;
}
if (tmpIfTest$17) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$18 = x % 3;
let tmpIfTest$20 = false;
if (tmpIfTest$18) {
  x = $(10, `ten`);
  tmpIfTest$20 = x % 2;
} else {
  tmpIfTest$20 = x % 2;
}
if (tmpIfTest$20) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$19 = x % 3;
let tmpIfTest$21 = false;
if (tmpIfTest$19) {
  x = $(10, `ten`);
  tmpIfTest$21 = x % 2;
} else {
  tmpIfTest$21 = x % 2;
}
if (tmpIfTest$21) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$22 = x % 3;
  let tmpIfTest$24 = false;
  if (tmpIfTest$22) {
    x = $(10, `ten`);
    tmpIfTest$24 = x % 2;
  } else {
    tmpIfTest$24 = x % 2;
  }
  if (tmpIfTest$24) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
const b = a % 3;
let c = false;
if (b) {
  a = $( 10, "ten" );
  c = a % 2;
}
else {
  c = a % 2;
}
if (c) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const d = a % 3;
let e = false;
if (d) {
  a = $( 10, "ten" );
  e = a % 2;
}
else {
  e = a % 2;
}
if (e) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const f = a % 3;
let g = false;
if (f) {
  a = $( 10, "ten" );
  g = a % 2;
}
else {
  g = a % 2;
}
if (g) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const h = a % 3;
let i = false;
if (h) {
  a = $( 10, "ten" );
  i = a % 2;
}
else {
  i = a % 2;
}
if (i) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const j = a % 3;
let k = false;
if (j) {
  a = $( 10, "ten" );
  k = a % 2;
}
else {
  k = a % 2;
}
if (k) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const l = a % 3;
let m = false;
if (l) {
  a = $( 10, "ten" );
  m = a % 2;
}
else {
  m = a % 2;
}
if (m) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const n = a % 3;
let o = false;
if (n) {
  a = $( 10, "ten" );
  o = a % 2;
}
else {
  o = a % 2;
}
if (o) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const p = a % 3;
let q = false;
if (p) {
  a = $( 10, "ten" );
  q = a % 2;
}
else {
  q = a % 2;
}
if (q) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const r = a % 3;
let s = false;
if (r) {
  a = $( 10, "ten" );
  s = a % 2;
}
else {
  s = a % 2;
}
if (s) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const t = a % 3;
let u = false;
if (t) {
  a = $( 10, "ten" );
  u = a % 2;
}
else {
  u = a % 2;
}
if (u) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const v = a % 3;
let w = false;
if (v) {
  a = $( 10, "ten" );
  w = a % 2;
}
else {
  w = a % 2;
}
if (w) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = a % 3;
  let y = false;
  if (x) {
    a = $( 10, "ten" );
    y = a % 2;
  }
  else {
    y = a % 2;
  }
  if (y) {
    a = a + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10, 'ten'
 - 3: 10, 'read'
 - 4: 10, 'ten'
 - 5: 10, 'read'
 - 6: 10, 'ten'
 - 7: 10, 'read'
 - 8: 10, 'ten'
 - 9: 10, 'read'
 - 10: 10, 'ten'
 - 11: 10, 'read'
 - 12: 10, 'ten'
 - 13: 10, 'read'
 - 14: 10, 'ten'
 - 15: 10, 'read'
 - 16: 10, 'ten'
 - 17: 10, 'read'
 - 18: 10, 'ten'
 - 19: 10, 'read'
 - 20: 10, 'ten'
 - 21: 10, 'read'
 - 22: 10, 'ten'
 - 23: 10, 'read'
 - 24: 10, 'ten'
 - 25: 10, 'read'
 - 26: 10, 'ten'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
