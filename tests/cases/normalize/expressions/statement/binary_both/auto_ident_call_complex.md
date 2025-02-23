# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) + $($)(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) + $($)(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpBinBothLhs = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 = $($);
const tmpBinBothRhs = tmpCallComplexCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpBinBothLhs /*:unknown*/ = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 /*:unknown*/ = $($);
const tmpBinBothRhs /*:unknown*/ = tmpCallComplexCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
const c = $( $ );
const d = c( 1 );
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
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
