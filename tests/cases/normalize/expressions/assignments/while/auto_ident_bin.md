# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > While > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) + $(2))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) + $(2))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 1
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: 100
 - 19: 1
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
