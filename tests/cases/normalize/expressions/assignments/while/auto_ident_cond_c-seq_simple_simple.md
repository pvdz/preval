# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > assignments > while > auto_ident_cond_c-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, $(30)) ? $(2) : $($(100)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 100
 - 4: 30
 - 5: 2
 - 6: 100
 - 7: 30
 - 8: 2
 - 9: 100
 - 10: 30
 - 11: 2
 - 12: 100
 - 13: 30
 - 14: 2
 - 15: 100
 - 16: 30
 - 17: 2
 - 18: 100
 - 19: 30
 - 20: 2
 - 21: 100
 - 22: 30
 - 23: 2
 - 24: 100
 - 25: 30
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
