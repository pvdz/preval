# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > for_b > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; ++$($(b)).x; $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    tmpIfTest = tmpNestedPropCompoundComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '2' }
 - 5: { x: '2' }
 - 6: 1
 - 7: { x: '3' }
 - 8: { x: '3' }
 - 9: 1
 - 10: { x: '4' }
 - 11: { x: '4' }
 - 12: 1
 - 13: { x: '5' }
 - 14: { x: '5' }
 - 15: 1
 - 16: { x: '6' }
 - 17: { x: '6' }
 - 18: 1
 - 19: { x: '7' }
 - 20: { x: '7' }
 - 21: 1
 - 22: { x: '8' }
 - 23: { x: '8' }
 - 24: 1
 - 25: { x: '9' }
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
