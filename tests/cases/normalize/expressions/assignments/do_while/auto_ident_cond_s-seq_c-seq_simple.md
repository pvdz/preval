# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > assignments > do_while > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))));
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
    const tmpIfTest$1 = 30;
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(60);
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
    if (30) {
      tmpNestedComplexRhs = $(60);
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
 - 2: 60
 - 3: 100
 - 4: 60
 - 5: 100
 - 6: 60
 - 7: 100
 - 8: 60
 - 9: 100
 - 10: 60
 - 11: 100
 - 12: 60
 - 13: 100
 - 14: 60
 - 15: 100
 - 16: 60
 - 17: 100
 - 18: 60
 - 19: 100
 - 20: 60
 - 21: 100
 - 22: 60
 - 23: 100
 - 24: 60
 - 25: 100
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same