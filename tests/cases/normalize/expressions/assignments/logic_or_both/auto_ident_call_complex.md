# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) || (a = $($)(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) || (a = $($)(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallComplexCallee = $($);
a = tmpCallComplexCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallComplexCallee$1 = $($);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
let a /*:unknown*/ = tmpCallComplexCallee(1);
if (a) {
  $(a);
} else {
  const tmpCallComplexCallee$1 /*:unknown*/ = $($);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallComplexCallee$1(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
let b = a( 1 );
if (b) {
  $( b );
}
else {
  const c = $( $ );
  const d = c( 1 );
  b = d;
  $( d );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
