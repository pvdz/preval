# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && 2) + ($($(1)) && 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && 2) + ($($(1)) && 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothLhs) {
  tmpBinBothLhs = 2;
} else {
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  tmpBinBothLhs = 2;
} else {
}
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
const c = $( 1 );
let d = $( c );
if (d) {
  d = 2;
}
b + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
