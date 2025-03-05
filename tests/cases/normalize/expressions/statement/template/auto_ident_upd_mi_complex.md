# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Template > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
$(`before  ` + $coerce(--$($(b)).x, `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$3 = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam$3);
const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs$1 - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const varInitAssignLhsComputedRhs$1 /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(varInitAssignLhsComputedRhs$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$3 /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam$3);
const tmpBinLhs$1 /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:number*/ = tmpBinLhs$1 - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, varInitAssignLhsComputedRhs);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = { x: 1 };
const g = $( f );
const h = $( g );
const i = h.x;
const j = i - 1;
h.x = j;
const k = l( a, j );
$( k );
const m = {
  a: 999,
  b: 1000,
};
$( m, f );
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
