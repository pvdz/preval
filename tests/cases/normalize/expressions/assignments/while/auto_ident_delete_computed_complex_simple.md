# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > while > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete $(x)["y"])) $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
  const tmpDeleteCompObj = $(x);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj['y'];
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
 - 1: { y: '1' }
 - 2: 100
 - 3: {}
 - 4: 100
 - 5: {}
 - 6: 100
 - 7: {}
 - 8: 100
 - 9: {}
 - 10: 100
 - 11: {}
 - 12: 100
 - 13: {}
 - 14: 100
 - 15: {}
 - 16: 100
 - 17: {}
 - 18: 100
 - 19: {}
 - 20: 100
 - 21: {}
 - 22: 100
 - 23: {}
 - 24: 100
 - 25: {}
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
