# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > do_while > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || ($($(1)) && $($(2)))));
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

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same