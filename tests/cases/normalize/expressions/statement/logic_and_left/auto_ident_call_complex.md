# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Logic and left > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) && $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) && $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
  $(100);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
  $(100);
} else {
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
  $( 100 );
}
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
