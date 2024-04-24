# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) ? 2 : $($(100))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($(1) ? 2 : $($(100)), `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
let tmpCallCallee$1 = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCallCallee$1 = 2;
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(100);
  tmpCallCallee$1 = tmpCallCallee$3(tmpCalleeParam$1);
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
let tmpCallCallee$1 = 2;
const tmpIfTest = $(1);
let tmpBinBothRhs = `2`;
let tmpCalleeParam = `before  2  after`;
if (tmpIfTest) {
  $(`before  2  after`);
} else {
  const tmpCalleeParam$1 = $(100);
  tmpCallCallee$1 = $(tmpCalleeParam$1);
  tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
let c = "2";
let d = "before  2  after";
if (b) {
  $( "before  2  after" );
}
else {
  const e = $( 100 );
  a = $( e );
  c = $coerce( a, "string" );
  d = `before  ${[object Object]}  after`;
  $( d );
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before 2 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
