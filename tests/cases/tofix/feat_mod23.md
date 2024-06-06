# Preval test case

# feat_mod23.md

> Tofix > Feat mod23
>
> A loop with a branch where a binding is updated in one side and read in another...


in dit geval is de assignment naar tmpIfTest$3 niet relevant en kan het net zo goed undefined zijn. of zelfs een nummer default

let tmpIfTest$3 = false;
if (tmpIfTest$4) {
  x = $(10, `ten`);
  tmpIfTest$3 = x % 2;
} else {
  tmpIfTest$3 = x % 2;
}


existing test

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    // Since the 10-write may not happen, this read may observe the ++x
    $(x, 'read');
  }
  if (x % 3) {
    x = $(10, 'ten');
  }
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
  if (x % 3) {
    x = $(10, `ten`);
  }
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
  const tmpIfTest$1 = x % 3;
  if (tmpIfTest$1) {
    x = $(10, `ten`);
  } else {
  }
}
`````

## Output


`````js filename=intro
let x = $(1);
const tmpIfTest = x % 2;
if (tmpIfTest) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$1 = x % 3;
let tmpIfTest$2 = false;
if (tmpIfTest$1) {
  x = $(10, `ten`);
  tmpIfTest$2 = x % 2;
} else {
  tmpIfTest$2 = x % 2;
}
if (tmpIfTest$2) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$4 = x % 3;
let tmpIfTest$3 = false;
if (tmpIfTest$4) {
  x = $(10, `ten`);
  tmpIfTest$3 = x % 2;
} else {
  tmpIfTest$3 = x % 2;
}
if (tmpIfTest$3) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$5 = x % 3;
let tmpIfTest$6 = false;
if (tmpIfTest$5) {
  x = $(10, `ten`);
  tmpIfTest$6 = x % 2;
} else {
  tmpIfTest$6 = x % 2;
}
if (tmpIfTest$6) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$8 = x % 3;
let tmpIfTest$7 = false;
if (tmpIfTest$8) {
  x = $(10, `ten`);
  tmpIfTest$7 = x % 2;
} else {
  tmpIfTest$7 = x % 2;
}
if (tmpIfTest$7) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$9 = x % 3;
let tmpIfTest$10 = false;
if (tmpIfTest$9) {
  x = $(10, `ten`);
  tmpIfTest$10 = x % 2;
} else {
  tmpIfTest$10 = x % 2;
}
if (tmpIfTest$10) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$12 = x % 3;
let tmpIfTest$11 = false;
if (tmpIfTest$12) {
  x = $(10, `ten`);
  tmpIfTest$11 = x % 2;
} else {
  tmpIfTest$11 = x % 2;
}
if (tmpIfTest$11) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$13 = x % 3;
let tmpIfTest$14 = false;
if (tmpIfTest$13) {
  x = $(10, `ten`);
  tmpIfTest$14 = x % 2;
} else {
  tmpIfTest$14 = x % 2;
}
if (tmpIfTest$14) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$16 = x % 3;
let tmpIfTest$15 = false;
if (tmpIfTest$16) {
  x = $(10, `ten`);
  tmpIfTest$15 = x % 2;
} else {
  tmpIfTest$15 = x % 2;
}
if (tmpIfTest$15) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$17 = x % 3;
let tmpIfTest$18 = false;
if (tmpIfTest$17) {
  x = $(10, `ten`);
  tmpIfTest$18 = x % 2;
} else {
  tmpIfTest$18 = x % 2;
}
if (tmpIfTest$18) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$20 = x % 3;
let tmpIfTest$19 = false;
if (tmpIfTest$20) {
  x = $(10, `ten`);
  tmpIfTest$19 = x % 2;
} else {
  tmpIfTest$19 = x % 2;
}
if (tmpIfTest$19) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$21 = x % 3;
if (tmpIfTest$21) {
  x = $(10, `ten`);
} else {
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$22 = x % 2;
  if (tmpIfTest$22) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
  const tmpIfTest$24 = x % 3;
  if (tmpIfTest$24) {
    x = $(10, `ten`);
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
const b = a % 2;
if (b) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const c = a % 3;
let d = false;
if (c) {
  a = $( 10, "ten" );
  d = a % 2;
}
else {
  d = a % 2;
}
if (d) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const e = a % 3;
let f = false;
if (e) {
  a = $( 10, "ten" );
  f = a % 2;
}
else {
  f = a % 2;
}
if (f) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const g = a % 3;
let h = false;
if (g) {
  a = $( 10, "ten" );
  h = a % 2;
}
else {
  h = a % 2;
}
if (h) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const i = a % 3;
let j = false;
if (i) {
  a = $( 10, "ten" );
  j = a % 2;
}
else {
  j = a % 2;
}
if (j) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const k = a % 3;
let l = false;
if (k) {
  a = $( 10, "ten" );
  l = a % 2;
}
else {
  l = a % 2;
}
if (l) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const m = a % 3;
let n = false;
if (m) {
  a = $( 10, "ten" );
  n = a % 2;
}
else {
  n = a % 2;
}
if (n) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const o = a % 3;
let p = false;
if (o) {
  a = $( 10, "ten" );
  p = a % 2;
}
else {
  p = a % 2;
}
if (p) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const q = a % 3;
let r = false;
if (q) {
  a = $( 10, "ten" );
  r = a % 2;
}
else {
  r = a % 2;
}
if (r) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const s = a % 3;
let t = false;
if (s) {
  a = $( 10, "ten" );
  t = a % 2;
}
else {
  t = a % 2;
}
if (t) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const u = a % 3;
let v = false;
if (u) {
  a = $( 10, "ten" );
  v = a % 2;
}
else {
  v = a % 2;
}
if (v) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const w = a % 3;
if (w) {
  a = $( 10, "ten" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = a % 2;
  if (x) {
    a = a + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
  const y = a % 3;
  if (y) {
    a = $( 10, "ten" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 'write'
 - 3: 10, 'ten'
 - 4: 10, 'read'
 - 5: 10, 'ten'
 - 6: 10, 'read'
 - 7: 10, 'ten'
 - 8: 10, 'read'
 - 9: 10, 'ten'
 - 10: 10, 'read'
 - 11: 10, 'ten'
 - 12: 10, 'read'
 - 13: 10, 'ten'
 - 14: 10, 'read'
 - 15: 10, 'ten'
 - 16: 10, 'read'
 - 17: 10, 'ten'
 - 18: 10, 'read'
 - 19: 10, 'ten'
 - 20: 10, 'read'
 - 21: 10, 'ten'
 - 22: 10, 'read'
 - 23: 10, 'ten'
 - 24: 10, 'read'
 - 25: 10, 'ten'
 - 26: 10, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
