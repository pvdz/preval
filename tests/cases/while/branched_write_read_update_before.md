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
let x = $(10);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  x = $(10);
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
$( 1 );
let a = $( 10 );
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = $( 10 );
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
