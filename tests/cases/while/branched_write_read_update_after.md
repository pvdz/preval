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
