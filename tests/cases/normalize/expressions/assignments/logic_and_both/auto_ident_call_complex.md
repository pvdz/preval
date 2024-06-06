# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) && (a = $($)(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) && (a = $($)(1)));
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
  const tmpCallComplexCallee$1 = $($);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
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
  const tmpCallComplexCallee$1 = $($);
  const tmpNestedComplexRhs = tmpCallComplexCallee$1(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
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
  const d = $( $ );
  const e = d( 1 );
  b = e;
  $( e );
}
else {
  $( c );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
