# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > While > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while (--$($(b)).x) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  if (varInitAssignLhsComputedRhs) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
