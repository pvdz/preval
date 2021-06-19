# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Template > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${++$($(b)).x}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + ++$($(b)).x + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs$1 + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = varInitAssignLhsComputedRhs;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam$1);
const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs$1 + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpBinLhs = `before  ` + varInitAssignLhsComputedRhs;
const tmpCalleeParam = `${tmpBinLhs}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 2 after'
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
