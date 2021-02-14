# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > assignments > do_while > auto_ident_upd_mi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = --$($(b)).x));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = varInitAssignLhsComputedObj.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = $(b);
    const varInitAssignLhsComputedObj = $(tmpCalleeParam);
    const tmpBinLhs = varInitAssignLhsComputedObj.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    a = varInitAssignLhsComputedRhs;
    tmpIfTest = varInitAssignLhsComputedRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 0, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
