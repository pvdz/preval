# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > assignments > do_while > auto_ident_cond_c-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, $(30)) ? $(2) : $($(100))));
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
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(2);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
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
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(2);
    } else {
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = $(tmpCalleeParam);
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
 - 2: 30
 - 3: 2
 - 4: 100
 - 5: 30
 - 6: 2
 - 7: 100
 - 8: 30
 - 9: 2
 - 10: 100
 - 11: 30
 - 12: 2
 - 13: 100
 - 14: 30
 - 15: 2
 - 16: 100
 - 17: 30
 - 18: 2
 - 19: 100
 - 20: 30
 - 21: 2
 - 22: 100
 - 23: 30
 - 24: 2
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same