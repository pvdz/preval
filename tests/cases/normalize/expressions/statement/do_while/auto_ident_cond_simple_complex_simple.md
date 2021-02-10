# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > do_while > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (1 ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  {
    tmpDoWhileTest = $(2);
  }
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 100
 - 4: 2
 - 5: 100
 - 6: 2
 - 7: 100
 - 8: 2
 - 9: 100
 - 10: 2
 - 11: 100
 - 12: 2
 - 13: 100
 - 14: 2
 - 15: 100
 - 16: 2
 - 17: 100
 - 18: 2
 - 19: 100
 - 20: 2
 - 21: 100
 - 22: 2
 - 23: 100
 - 24: 2
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
