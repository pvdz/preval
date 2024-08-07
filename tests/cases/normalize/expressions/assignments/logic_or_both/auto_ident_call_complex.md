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
const tmpCallComplexCallee = $($);
let a = tmpCallComplexCallee(1);
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCallComplexCallee$1 = $($);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1(1);
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
const c = b;
if (b) {
  $( c );
}
else {
  const d = $( $ );
  const e = d( 1 );
  b = e;
  $( e );
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
