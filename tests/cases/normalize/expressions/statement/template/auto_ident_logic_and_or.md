# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Template > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${($($(1)) && $($(1))) || $($(2))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(($($(1)) && $($(1))) || $($(2)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(1);
let tmpCallCallee$1 = tmpCallCallee$3(tmpCalleeParam$1);
if (tmpCallCallee$1) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCallCallee$1 = tmpCallCallee$5(tmpCalleeParam$3);
} else {
}
if (tmpCallCallee$1) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$5 = $(2);
  tmpCallCallee$1 = tmpCallCallee$7(tmpCalleeParam$5);
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
const tmpCalleeParam$1 = $(1);
let tmpCallCallee$1 = $(tmpCalleeParam$1);
if (tmpCallCallee$1) {
  const tmpCalleeParam$3 = $(1);
  tmpCallCallee$1 = $(tmpCalleeParam$3);
} else {
}
if (tmpCallCallee$1) {
  const tmpClusterSSA_tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
  const tmpClusterSSA_tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$5 = $(2);
  const tmpClusterSSA_tmpCallCallee$1 = $(tmpCalleeParam$5);
  const tmpClusterSSA_tmpBinBothRhs$1 = $coerce(tmpClusterSSA_tmpCallCallee$1, `string`);
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  const d = $coerce( b, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
else {
  const f = $( 2 );
  const g = $( f );
  const h = $coerce( g, "string" );
  const i = `before  ${h}  after`;
  $( i );
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
