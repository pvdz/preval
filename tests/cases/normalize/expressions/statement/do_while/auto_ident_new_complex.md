# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > statement > do_while > auto_ident_new_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new ($($))(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpNewCallee = $($);
  tmpDoWhileTest = new tmpNewCallee(1);
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpNewCallee = $($);
  tmpDoWhileTest = new tmpNewCallee(1);
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
