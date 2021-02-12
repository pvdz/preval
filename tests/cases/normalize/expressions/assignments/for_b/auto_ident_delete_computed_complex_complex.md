# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > assignments > for_b > auto_ident_delete_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete $(x)[$("y")]); $(1));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 1
 - 4: {}
 - 5: 'y'
 - 6: 1
 - 7: {}
 - 8: 'y'
 - 9: 1
 - 10: {}
 - 11: 'y'
 - 12: 1
 - 13: {}
 - 14: 'y'
 - 15: 1
 - 16: {}
 - 17: 'y'
 - 18: 1
 - 19: {}
 - 20: 'y'
 - 21: 1
 - 22: {}
 - 23: 'y'
 - 24: 1
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
