# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > for_b > auto_ident_upd_pi_complex
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
let b = { x: 1 };
const varInitAssignLhsComputedObj = $(b);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
