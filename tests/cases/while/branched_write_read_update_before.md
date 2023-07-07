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
