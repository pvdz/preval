# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? 2 : $($(100))) + ($(1) ? 2 : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? 2 : $($(100))) + ($(1) ? 2 : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothLhs = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
}
let tmpBinBothRhs = undefined;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  tmpBinBothRhs = 2;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
let tmpBinBothLhs = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
let tmpBinBothRhs = 2;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
let d = 2;
const e = $( 1 );
if (e) {

}
else {
  const f = $( 100 );
  d = $( f );
}
a + d;
const g = {
a: 999,
b: 1000
;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
