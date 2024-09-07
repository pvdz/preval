# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Template > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || ($($(1)) && $($(2)))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($($(0)) || ($($(1)) && $($(2))), `string`) + `  after`);
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
  const tmpCalleeParam$3 = $(1);
  tmpCallCallee$1 = tmpCallCallee$5(tmpCalleeParam$3);
  if (tmpCallCallee$1) {
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$5 = $(2);
    tmpCallCallee$1 = tmpCallCallee$7(tmpCalleeParam$5);
  } else {
  }
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
if (tmpCallCallee$1) {
} else {
  const tmpCalleeParam$3 = $(1);
  tmpCallCallee$1 = $(tmpCalleeParam$3);
  if (tmpCallCallee$1) {
    const tmpCalleeParam$5 = $(2);
    tmpCallCallee$1 = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $coerce( b, "string" );
const f = `before  ${e}  after`;
$( f );
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 'before 2 after'
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
