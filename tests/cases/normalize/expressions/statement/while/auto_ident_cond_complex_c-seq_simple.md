# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > while > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
  }
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
 - 1: 1
 - 2: 60
 - 3: 100
 - 4: 1
 - 5: 60
 - 6: 100
 - 7: 1
 - 8: 60
 - 9: 100
 - 10: 1
 - 11: 60
 - 12: 100
 - 13: 1
 - 14: 60
 - 15: 100
 - 16: 1
 - 17: 60
 - 18: 100
 - 19: 1
 - 20: 60
 - 21: 100
 - 22: 1
 - 23: 60
 - 24: 100
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
