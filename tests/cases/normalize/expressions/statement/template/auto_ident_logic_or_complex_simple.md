# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Template > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || 2}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($($(0)) || 2, `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(0);
let tmpCallCallee$1 = tmpCallCallee$3(tmpCalleeParam$1);
if (tmpCallCallee$1) {
} else {
  tmpCallCallee$1 = 2;
}
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let tmpCallCallee$1 = $(tmpCalleeParam$1);
let tmpBinBothRhs = `2`;
let tmpCalleeParam = undefined;
if (tmpCallCallee$1) {
  tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
} else {
  tmpCallCallee$1 = 2;
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = "2";
let d = undefined;
if (b) {
  c = $coerce( b, "string" );
  d = `before  ${[object Object]}  after`;
  $( d );
}
else {
  b = 2;
  d = `before  ${[object Object]}  after`;
  $( d );
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 'before 2 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
