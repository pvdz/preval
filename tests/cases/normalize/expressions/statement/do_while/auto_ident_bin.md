# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Do while > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(1) + $(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $(1) + $(2);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    tmpDoWhileFlag = tmpBinBothLhs + tmpBinBothRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpDoWhileFlag = tmpBinBothLhs + tmpBinBothRhs;
if (tmpDoWhileFlag) {
  $(100);
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  let tmpClusterSSA_tmpDoWhileFlag = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpBinBothLhs$2 = $(1);
      const tmpBinBothRhs$2 = $(2);
      tmpClusterSSA_tmpDoWhileFlag = tmpBinBothLhs$2 + tmpBinBothRhs$2;
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
