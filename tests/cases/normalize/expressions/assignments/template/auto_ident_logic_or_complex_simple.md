# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(0)) || 2)}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($(0)) || 2), `string`) + `  after`);
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
  a = 2;
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
if (a) {
  const tmpClusterSSA_tmpBinBothRhs = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  a = 2;
  $(`before  2  after`);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {
  const c = $coerce( b, "string" );
  const d = `before  ${[object Object]}  after`;
  $( d );
}
else {
  b = 2;
  $( "before  2  after" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 'before 2 after'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
