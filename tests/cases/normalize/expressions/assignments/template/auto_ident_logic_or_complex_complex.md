# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(0)) || $($(2)))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($(0)) || $($(2))), `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$3(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$5(tmpCalleeParam$3);
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
const tmpCalleeParam$1 = $(0);
let a = $(tmpCalleeParam$1);
let tmpBinBothRhs = undefined;
let tmpCalleeParam = undefined;
if (a) {
  tmpBinBothRhs = $coerce(a, `string`);
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
  tmpBinBothRhs = $coerce(a, `string`);
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
let d = undefined;
if (b) {
  c = $coerce( b, "string" );
  d = `before  ${[object Object]}  after`;
  $( d );
}
else {
  const e = $( 2 );
  b = $( e );
  c = $coerce( b, "string" );
  d = `before  ${[object Object]}  after`;
  $( d );
}
$( b );
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
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
