# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
export default ++$($(b)).x;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ++$($(b)).x;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
