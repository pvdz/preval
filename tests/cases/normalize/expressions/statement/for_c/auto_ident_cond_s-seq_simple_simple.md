# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > for_c > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); (10, 20, 30) ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = 30;
      if (tmpIfTest$1) {
        $(2);
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        tmpCallCallee(tmpCalleeParam);
      }
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      if (30) {
        $(2);
      } else {
        const tmpCalleeParam = $(100);
        $(tmpCalleeParam);
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same