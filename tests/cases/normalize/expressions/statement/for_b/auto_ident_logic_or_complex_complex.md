# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > for_b > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($(0)) || $($(2)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
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
    const tmpCalleeParam = $(0);
    let tmpIfTest = $(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$1 = $(2);
      tmpIfTest = $(tmpCalleeParam$1);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
