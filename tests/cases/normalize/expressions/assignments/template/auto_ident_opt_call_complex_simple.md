# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($)?.(1))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($)?.(1)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`before  undefined  after`);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpChainElementCall$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {
  $( "before  undefined  after" );
}
else {
  const d = $dotCall( b, $, undefined, 1 );
  a = d;
  const e = $coerce( d, "string" );
  const f = `before  ${e}  after`;
  $( f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 'before 1 after'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
