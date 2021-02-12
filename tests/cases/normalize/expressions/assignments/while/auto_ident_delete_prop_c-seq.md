# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > while > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), $(x)).y)) $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  $(1);
  $(2);
  const tmpDeleteObj = $(x);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  $(1);
  $(2);
  const tmpDeleteObj = $(x);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
