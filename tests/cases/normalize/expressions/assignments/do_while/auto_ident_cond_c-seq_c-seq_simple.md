# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > do_while > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    tmpNestedComplexRhs = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
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
 - 2: 30
 - 3: 60
 - 4: 100
 - 5: 30
 - 6: 60
 - 7: 100
 - 8: 30
 - 9: 60
 - 10: 100
 - 11: 30
 - 12: 60
 - 13: 100
 - 14: 30
 - 15: 60
 - 16: 100
 - 17: 30
 - 18: 60
 - 19: 100
 - 20: 30
 - 21: 60
 - 22: 100
 - 23: 30
 - 24: 60
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
