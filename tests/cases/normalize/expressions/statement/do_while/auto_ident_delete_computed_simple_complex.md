# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > do_while > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete x[$("y")]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  tmpDoWhileTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
} while (tmpDoWhileTest);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  tmpDoWhileTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
} while (tmpDoWhileTest);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'y'
 - 3: 100
 - 4: 'y'
 - 5: 100
 - 6: 'y'
 - 7: 100
 - 8: 'y'
 - 9: 100
 - 10: 'y'
 - 11: 100
 - 12: 'y'
 - 13: 100
 - 14: 'y'
 - 15: 100
 - 16: 'y'
 - 17: 100
 - 18: 'y'
 - 19: 100
 - 20: 'y'
 - 21: 100
 - 22: 'y'
 - 23: 100
 - 24: 'y'
 - 25: 100
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
