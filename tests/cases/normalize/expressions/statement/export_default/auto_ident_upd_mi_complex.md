# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
export default --$($(b)).x;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = --$($(b)).x;
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
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:number*/ = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport /*:unknown*/ = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
const f = e;
export { f as default };
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
