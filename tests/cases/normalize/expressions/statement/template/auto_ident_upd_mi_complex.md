# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Template > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${--$($(b)).x}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + String(--$($(b)).x) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(b);
const varInitAssignLhsComputedObj = tmpCallCallee$3(tmpCalleeParam$3);
const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs$1 - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam$3);
const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs$1 - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = String(varInitAssignLhsComputedRhs);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 0 after'
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
