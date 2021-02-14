# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > statement > for_c > auto_ident_cond_c-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); (10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(30);
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
      const tmpIfTest$1 = $(30);
      if (tmpIfTest$1) {
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

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 2
 - 4: 1
 - 5: 30
 - 6: 2
 - 7: 1
 - 8: 30
 - 9: 2
 - 10: 1
 - 11: 30
 - 12: 2
 - 13: 1
 - 14: 30
 - 15: 2
 - 16: 1
 - 17: 30
 - 18: 2
 - 19: 1
 - 20: 30
 - 21: 2
 - 22: 1
 - 23: 30
 - 24: 2
 - 25: 1
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
