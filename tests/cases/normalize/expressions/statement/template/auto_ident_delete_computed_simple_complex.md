# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Template > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${delete arg[$("y")]}  after`);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(delete arg[$(`y`)], `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpCallCallee$1 = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const tmpCallCallee$2 /*:boolean*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpCallCallee$2, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpCallCallee$1 /*:boolean*/ = delete arg[tmpDeleteCompProp];
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpCallCallee$1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
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
const f = $( "y" );
const g = { y: 1 };
const h = delete g[ f ];
const i = j( a, h );
$( i );
const k = {
  a: 999,
  b: 1000,
};
$( k, g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'before true after'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
