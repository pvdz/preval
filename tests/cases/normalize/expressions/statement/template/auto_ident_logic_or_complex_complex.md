# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Template > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || $($(2))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($($(0)) || $($(2)), `string`) + `  after`);
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
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCallCallee$1 = tmpCallCallee$5(tmpCalleeParam$3);
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
let tmpBinBothRhs = undefined;
let tmpStringConcatL = undefined;
let tmpCalleeParam = undefined;
if (tmpCallCallee$1) {
  tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
  tmpStringConcatL = $coerce(tmpBinBothRhs, `plustr`);
  tmpCalleeParam = `before  ${tmpStringConcatL}  after`;
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$3 = $(2);
  tmpCallCallee$1 = $(tmpCalleeParam$3);
  tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
  tmpStringConcatL = $coerce(tmpBinBothRhs, `plustr`);
  tmpCalleeParam = `before  ${tmpStringConcatL}  after`;
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
let c = undefined;
let d = undefined;
let e = undefined;
if (b) {
  c = $coerce( b, "string" );
  d = $coerce( c, "plustr" );
  e = `before  ${[object Object]}  after`;
  $( e );
}
else {
  const f = $( 2 );
  b = $( f );
  c = $coerce( b, "string" );
  d = $coerce( c, "plustr" );
  e = `before  ${[object Object]}  after`;
  $( e );
}
const g = {
a: 999,
b: 1000
;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 'before 2 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
