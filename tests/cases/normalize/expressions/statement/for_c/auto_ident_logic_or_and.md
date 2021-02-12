# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > for_c > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(0);
      const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
      if (tmpIfTest$1) {
      } else {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        const tmpIfTest$2 = tmpCallCallee$1(tmpCalleeParam$1);
        if (tmpIfTest$2) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          tmpCallCallee$2(tmpCalleeParam$2);
        }
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
      const tmpCallCallee = $;
      const tmpCalleeParam = $(0);
      const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
      if (tmpIfTest$1) {
      } else {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        const tmpIfTest$2 = tmpCallCallee$1(tmpCalleeParam$1);
        if (tmpIfTest$2) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          tmpCallCallee$2(tmpCalleeParam$2);
        }
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
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
