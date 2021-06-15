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
while (true) {
  const tmpIfTest = x % 3;
  if (tmpIfTest) {
    x = $(10, `ten`);
  } else {
  }
  const tmpIfTest$1 = x % 2;
  if (tmpIfTest$1) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
