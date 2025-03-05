# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = ++$($(b)).x)}  after`);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = ++$($(b)).x), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = tmpCallCallee$3(tmpCalleeParam$1);
const tmpBinLhs$1 = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs$1 + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const tmpNestedPropCompoundComplexRhs$1 /*:primitive*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedPropCompoundComplexRhs$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinLhs$1 /*:unknown*/ = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs /*:primitive*/ = tmpBinLhs$1 + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpNestedPropCompoundComplexRhs);
$(tmpCalleeParam);
$(tmpNestedPropCompoundComplexRhs, b);
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
const j = i + 1;
h.x = j;
const k = l( a, j );
$( k );
$( j, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 2 after'
 - 4: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
