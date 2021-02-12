# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > while > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete x[$("y")]) $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
 - 1: 'y'
 - 2: 100
 - 3: 'y'
 - 4: 100
 - 5: 'y'
 - 6: 100
 - 7: 'y'
 - 8: 100
 - 9: 'y'
 - 10: 100
 - 11: 'y'
 - 12: 100
 - 13: 'y'
 - 14: 100
 - 15: 'y'
 - 16: 100
 - 17: 'y'
 - 18: 100
 - 19: 'y'
 - 20: 100
 - 21: 'y'
 - 22: 100
 - 23: 'y'
 - 24: 100
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
