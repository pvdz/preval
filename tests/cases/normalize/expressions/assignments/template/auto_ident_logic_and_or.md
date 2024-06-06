# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Template > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = ($($(1)) && $($(1))) || $($(2)))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = ($($(1)) && $($(1))) || $($(2))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$3(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$5(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$5 = $(2);
  a = tmpCallCallee$7(tmpCalleeParam$5);
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
const tmpCalleeParam$1 = $(1);
let a = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
if (a) {
  const tmpClusterSSA_tmpBinBothRhs = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
  const tmpClusterSSA_tmpBinBothRhs$1 = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam$1 = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  const d = $coerce( b, "string" );
  const e = `before  ${[object Object]}  after`;
  $( e );
}
else {
  const f = $( 2 );
  b = $( f );
  const g = $coerce( b, "string" );
  const h = `before  ${[object Object]}  after`;
  $( h );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 'before 1 after'
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
