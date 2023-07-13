# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($($(1)) && $($(1))) || $($(2)));
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
    tmpDoWhileFlag = ($($(1)) && $($(1))) || $($(2));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    if (tmpDoWhileFlag) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
    } else {
    }
    if (tmpDoWhileFlag) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpDoWhileFlag = tmpCallCallee$3(tmpCalleeParam$3);
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = $(1);
let tmpDoWhileFlag = $(tmpCalleeParam);
if (tmpDoWhileFlag) {
  const tmpCalleeParam$1 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
} else {
}
let $tmpLoopUnrollCheck = false;
if (tmpDoWhileFlag) {
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
} else {
  const tmpCalleeParam$3 = $(2);
  tmpDoWhileFlag = $(tmpCalleeParam$3);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$2);
  if (tmpDoWhileFlag) {
    const tmpCalleeParam$4 = $(1);
    tmpDoWhileFlag = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam$6 = $(2);
    tmpDoWhileFlag = $(tmpCalleeParam$6);
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$5 = $(1);
      tmpDoWhileFlag = $(tmpCalleeParam$5);
      if (tmpDoWhileFlag) {
        const tmpCalleeParam$7 = $(1);
        tmpDoWhileFlag = $(tmpCalleeParam$7);
      } else {
      }
      if (tmpDoWhileFlag) {
      } else {
        const tmpCalleeParam$9 = $(2);
        tmpDoWhileFlag = $(tmpCalleeParam$9);
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
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
