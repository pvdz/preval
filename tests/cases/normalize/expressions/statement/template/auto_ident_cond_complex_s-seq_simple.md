# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) ? (40, 50, 60) : $($(100))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($(1) ? (40, 50, 60) : $($(100)), `string`) + `  after`);
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
  tmpCallCallee$1 = 60;
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
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`before  60  after`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCallCallee$1 /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_tmpCallCallee$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "before  60  after" );
}
else {
  const b = $( 100 );
  const c = $( b );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before 60 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
