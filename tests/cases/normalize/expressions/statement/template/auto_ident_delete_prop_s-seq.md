# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Template > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${delete ($(1), $(2), arg).y}  after`);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(delete ($(1), $(2), arg).y, `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpCallCallee$1 = delete tmpDeleteObj.y;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpFree /*:()=>string*/ = function $free() {
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpCallCallee$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpCallCallee$1 /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = $coerce( d, "string" );
  const e = `before  ${c}  after`;
  return e;
};
$( 1 );
$( 2 );
const f = { y: 1 };
const d = delete f.y;
const g = h( a );
$( g );
const i = {
  a: 999,
  b: 1000,
};
$( i, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before true after'
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
