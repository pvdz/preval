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
let x = $(1);
const tmpIfTest = x % 2;
if (tmpIfTest) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$1 = x % 2;
if (tmpIfTest$1) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$2 = x % 2;
if (tmpIfTest$2) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$3 = x % 2;
if (tmpIfTest$3) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$4 = x % 2;
if (tmpIfTest$4) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$5 = x % 2;
if (tmpIfTest$5) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$6 = x % 2;
if (tmpIfTest$6) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$7 = x % 2;
if (tmpIfTest$7) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$8 = x % 2;
if (tmpIfTest$8) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$9 = x % 2;
if (tmpIfTest$9) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
const tmpIfTest$10 = x % 2;
if (tmpIfTest$10) {
  x = x + 1;
  $(x, `write`);
} else {
  $(x, `read`);
}
x = $(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$11 = x % 2;
  if (tmpIfTest$11) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
  x = $(10);
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
a = $( 10 );
const c = a % 2;
if (c) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const d = a % 2;
if (d) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const e = a % 2;
if (e) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const f = a % 2;
if (f) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const g = a % 2;
if (g) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const h = a % 2;
if (h) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const i = a % 2;
if (i) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const j = a % 2;
if (j) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const k = a % 2;
if (k) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
const l = a % 2;
if (l) {
  a = a + 1;
  $( a, "write" );
}
else {
  $( a, "read" );
}
a = $( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = a % 2;
  if (m) {
    a = a + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
  a = $( 10 );
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
