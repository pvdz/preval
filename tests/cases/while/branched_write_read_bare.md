# Preval test case

# branched_write_read_bare.md

> While > Branched write read bare
>
> A loop with a branch where a binding is updated in one side and read in another...

(Technically this is an infinite loop that writes once since after that it only goes to the read branch)

#TODO

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    $(x, 'read');
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
const tmpIfTest$1 = x % 2;
if (tmpIfTest$1) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$2 = x % 2;
if (tmpIfTest$2) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$3 = x % 2;
if (tmpIfTest$3) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$4 = x % 2;
if (tmpIfTest$4) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$5 = x % 2;
if (tmpIfTest$5) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$6 = x % 2;
if (tmpIfTest$6) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$7 = x % 2;
if (tmpIfTest$7) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$8 = x % 2;
if (tmpIfTest$8) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$9 = x % 2;
if (tmpIfTest$9) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
const tmpIfTest$10 = x % 2;
if (tmpIfTest$10) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$11 = x % 2;
  if (tmpIfTest$11) {
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
const b = a % 2;
if (b) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const c = a % 2;
if (c) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const d = a % 2;
if (d) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const e = a % 2;
if (e) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const f = a % 2;
if (f) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const g = a % 2;
if (g) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const h = a % 2;
if (h) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const i = a % 2;
if (i) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const j = a % 2;
if (j) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const k = a % 2;
if (k) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
const l = a % 2;
if (l) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = a % 2;
  if (m) {
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
 - 2: 2, 'write'
 - 3: 2, 'read'
 - 4: 2, 'read'
 - 5: 2, 'read'
 - 6: 2, 'read'
 - 7: 2, 'read'
 - 8: 2, 'read'
 - 9: 2, 'read'
 - 10: 2, 'read'
 - 11: 2, 'read'
 - 12: 2, 'read'
 - 13: 2, 'read'
 - 14: 2, 'read'
 - 15: 2, 'read'
 - 16: 2, 'read'
 - 17: 2, 'read'
 - 18: 2, 'read'
 - 19: 2, 'read'
 - 20: 2, 'read'
 - 21: 2, 'read'
 - 22: 2, 'read'
 - 23: 2, 'read'
 - 24: 2, 'read'
 - 25: 2, 'read'
 - 26: 2, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
