# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > while > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete $(arg)[$("y")]) $(100);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 100
 - 4: {}
 - 5: 'y'
 - 6: 100
 - 7: {}
 - 8: 'y'
 - 9: 100
 - 10: {}
 - 11: 'y'
 - 12: 100
 - 13: {}
 - 14: 'y'
 - 15: 100
 - 16: {}
 - 17: 'y'
 - 18: 100
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: {}
 - 23: 'y'
 - 24: 100
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
