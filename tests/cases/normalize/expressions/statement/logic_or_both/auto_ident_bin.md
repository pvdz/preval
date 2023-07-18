# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Logic or both > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) || $(1) + $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) || $(1) + $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpIfTest = tmpBinBothLhs + tmpBinBothRhs;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  tmpBinBothLhs$1 + tmpBinBothRhs$1;
}
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpIfTest = tmpBinBothLhs + tmpBinBothRhs;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  tmpBinBothLhs$1 + tmpBinBothRhs$1;
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
if (c) {

}
else {
  const d = $( 1 );
  const e = $( 2 );
  d + e;
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
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
