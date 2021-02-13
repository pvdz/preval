# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > statement > for_b > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (10, 20, 30) ? (40, 50, $(60)) : $($(100)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest = undefined;
    const tmpIfTest$1 = 30;
    if (tmpIfTest$1) {
      tmpIfTest = $(60);
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
    if (30) {
      tmpIfTest = $(60);
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
 - 1: 60
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 60
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 60
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 60
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 60
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same