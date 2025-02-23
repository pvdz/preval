# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) || (a = new ($($))(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) || (a = new ($($))(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
let a /*:unknown*/ = new tmpNewCallee(1);
if (a) {
  $(a);
} else {
  const tmpNewCallee$1 /*:unknown*/ = $($);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
let b = new a( 1 );
if (b) {
  $( b );
}
else {
  const c = $( $ );
  const d = new c( 1 );
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
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
