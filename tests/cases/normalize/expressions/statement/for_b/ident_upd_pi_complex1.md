# Preval test case

# ident_upd_pi_complex1.md

> Normalize > Expressions > Statement > For b > Ident upd pi complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };
$($(b).x += 1);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
const tmpCallCallee = $;
const varInitAssignLhsComputedObj = $(b);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const varInitAssignLhsComputedObj = $(b);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
