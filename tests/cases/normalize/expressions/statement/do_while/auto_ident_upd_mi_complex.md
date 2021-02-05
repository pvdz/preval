# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > do_while > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (--$($(b)).x);
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  tmpDoWhileTest = tmpNestedPropCompoundComplexRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  tmpDoWhileTest = tmpNestedPropCompoundComplexRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
