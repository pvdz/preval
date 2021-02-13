# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > statement > for_b > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (10, 20, $(30)) ? (40, 50, 60) : $($(100)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpIfTest = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpIfTest = tmpCallCallee(tmpCalleeParam);
    }
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpIfTest = 60;
    } else {
      const tmpCalleeParam = $(100);
      tmpIfTest = $(tmpCalleeParam);
    }
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 1
 - 3: 30
 - 4: 1
 - 5: 30
 - 6: 1
 - 7: 30
 - 8: 1
 - 9: 30
 - 10: 1
 - 11: 30
 - 12: 1
 - 13: 30
 - 14: 1
 - 15: 30
 - 16: 1
 - 17: 30
 - 18: 1
 - 19: 30
 - 20: 1
 - 21: 30
 - 22: 1
 - 23: 30
 - 24: 1
 - 25: 30
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same