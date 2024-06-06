# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
++$($(b)).x + ++$($(b)).x;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
++$($(b)).x + ++$($(b)).x;
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
const tmpBinBothLhs = varInitAssignLhsComputedRhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj$1 = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs$1 = varInitAssignLhsComputedObj$1.x;
const varInitAssignLhsComputedRhs$1 = tmpBinLhs$1 + 1;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
const tmpBinBothRhs = varInitAssignLhsComputedRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
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
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj$1 = $(tmpCalleeParam$1);
const tmpBinLhs$1 = varInitAssignLhsComputedObj$1.x;
const varInitAssignLhsComputedRhs$1 = tmpBinLhs$1 + 1;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedRhs + varInitAssignLhsComputedRhs$1;
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = $( c );
const e = d.x;
const f = e + 1;
d.x = f;
const g = $( a );
const h = $( g );
const i = h.x;
const j = i + 1;
h.x = j;
f + j;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '2' }
 - 4: { x: '2' }
 - 5: { a: '999', b: '1000' }, { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
