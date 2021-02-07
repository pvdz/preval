# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > do_while > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $('c');
  tmpDoWhileTest = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
} while (tmpDoWhileTest);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $('c');
  tmpDoWhileTest = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
} while (tmpDoWhileTest);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: 100
 - 4: 'c'
 - 5: 100
 - 6: 'c'
 - 7: 100
 - 8: 'c'
 - 9: 100
 - 10: 'c'
 - 11: 100
 - 12: 'c'
 - 13: 100
 - 14: 'c'
 - 15: 100
 - 16: 'c'
 - 17: 100
 - 18: 'c'
 - 19: 100
 - 20: 'c'
 - 21: 100
 - 22: 'c'
 - 23: 100
 - 24: 'c'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
