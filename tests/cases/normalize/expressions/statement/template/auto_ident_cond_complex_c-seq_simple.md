# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) ? (40, 50, $(60)) : $($(100))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($(1) ? (40, 50, $(60)) : $($(100)), `string`) + `  after`);
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
  tmpCallCallee$1 = $(60);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCallCallee$1 = $(60);
  const tmpClusterSSA_tmpBinBothRhs = $coerce(tmpClusterSSA_tmpCallCallee$1, `string`);
  const tmpClusterSSA_tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 = $(100);
  const tmpClusterSSA_tmpCallCallee$2 = $(tmpCalleeParam$1);
  const tmpClusterSSA_tmpBinBothRhs$1 = $coerce(tmpClusterSSA_tmpCallCallee$2, `string`);
  const tmpClusterSSA_tmpCalleeParam$1 = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 60 );
  const c = $coerce( b, "string" );
  const d = `before  ${[object Object]}  after`;
  $( d );
}
else {
  const e = $( 100 );
  const f = $( e );
  const g = $coerce( f, "string" );
  const h = `before  ${[object Object]}  after`;
  $( h );
}
const i = {
a: 999,
b: 1000
;
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 'before 60 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
