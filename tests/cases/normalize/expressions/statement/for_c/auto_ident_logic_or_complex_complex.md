# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > for_c > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($(0)) || $($(2)));
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
        const tmpCalleeParam$1 = $(2);
        tmpCallCallee$1(tmpCalleeParam$1);
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
        const tmpCalleeParam$1 = $(2);
        tmpCallCallee$1(tmpCalleeParam$1);
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
 - 4: 2
 - 5: 2
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 1
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 1
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
