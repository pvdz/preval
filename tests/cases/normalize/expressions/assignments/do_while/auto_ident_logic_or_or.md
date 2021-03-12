# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || (a = $($(0)) || $($(1)) || $($(2)))) {
    tmpDoWhileFlag = false;
    {
      $(100);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpNestedComplexRhs) {
      } else {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
      }
    }
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = $(0);
    let tmpNestedComplexRhs = $(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = $(tmpCalleeParam$1);
      if (tmpNestedComplexRhs) {
      } else {
        const tmpCalleeParam$2 = $(2);
        tmpNestedComplexRhs = $(tmpCalleeParam$2);
      }
    }
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
