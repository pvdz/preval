# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) || $($)(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) || $($)(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
} else {
  const tmpCallComplexCallee$1 = $($);
  tmpCallComplexCallee$1(1);
}
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
} else {
  const tmpCallComplexCallee$1 = $($);
  tmpCallComplexCallee$1(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
if (b) {

}
else {
  const c = $( $ );
  c( 1 );
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
