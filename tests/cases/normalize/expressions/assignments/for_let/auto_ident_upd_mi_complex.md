# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > assignments > for_let > auto_ident_upd_mi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = --$($(b)).x); ; $(1)) $(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0
 - 4: 1
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 1
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 1
 - 15: 0
 - 16: 1
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 1
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same