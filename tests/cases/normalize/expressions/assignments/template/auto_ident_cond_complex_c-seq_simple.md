# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $(1) ? (40, 50, $(60)) : $($(100)))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $(1) ? (40, 50, $(60)) : $($(100))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$3(tmpCalleeParam$1);
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
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(60);
  const tmpClusterSSA_tmpBinBothRhs = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
  const tmpClusterSSA_tmpBinBothRhs$1 = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam$1 = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
if (b) {
  a = $( 60 );
  const c = $coerce( a, "string" );
  const d = `before  ${[object Object]}  after`;
  $( d );
}
else {
  const e = $( 100 );
  a = $( e );
  const f = $coerce( a, "string" );
  const g = `before  ${[object Object]}  after`;
  $( g );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 'before 60 after'
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
