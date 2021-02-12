# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > do_while > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete $(x)[$("y")]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 100
 - 5: {}
 - 6: 'y'
 - 7: 100
 - 8: {}
 - 9: 'y'
 - 10: 100
 - 11: {}
 - 12: 'y'
 - 13: 100
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: {}
 - 18: 'y'
 - 19: 100
 - 20: {}
 - 21: 'y'
 - 22: 100
 - 23: {}
 - 24: 'y'
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
