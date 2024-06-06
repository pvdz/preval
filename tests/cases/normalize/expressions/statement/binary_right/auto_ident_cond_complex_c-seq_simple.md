# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothRhs = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpBinBothRhs = $(tmpCalleeParam);
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = $( 1 );
if (c) {
  b = $( 60 );
}
else {
  const d = $( 100 );
  b = $( d );
}
a + b;
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
