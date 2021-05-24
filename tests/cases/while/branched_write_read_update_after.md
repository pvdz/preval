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
    $(++x, 'write');
  } else {
    $(x, 'read');
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
    const tmpCalleeParam$1 = 'write';
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    $(x, 'read');
  }
  x = $(10);
}
`````

## Output

`````js filename=intro
let x = $(1);
while (true) {
  const tmpIfTest = x % 2;
  if (tmpIfTest) {
    x = x + 1;
    $(x, 'write');
  } else {
    $(x, 'read');
  }
  x = $(10);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
