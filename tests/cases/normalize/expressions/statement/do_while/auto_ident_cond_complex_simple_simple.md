# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(1) ? 2 : $($(100)));
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
    tmpDoWhileFlag = $(1) ? 2 : $($(100));
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      tmpDoWhileFlag = 2;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
$(100);
const tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpDoWhileFlag = $(tmpCalleeParam);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpDoWhileFlag = true;
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpDoWhileFlag = $(tmpCalleeParam$1);
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        tmpDoWhileFlag = true;
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpDoWhileFlag = $(tmpCalleeParam$2);
      }
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
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
