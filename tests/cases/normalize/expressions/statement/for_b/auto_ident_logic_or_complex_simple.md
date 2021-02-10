# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > for_b > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($(0)) || 2; $(1));
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
      tmpIfTest = 2;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 0
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 0
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 0
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 0
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
