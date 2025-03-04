# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = !$(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = !$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpUnaryArg = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
if (tmpIfTest) {
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpNestedComplexRhs /*:boolean*/ = !tmpClusterSSA_tmpCalleeParam;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
const c = $( 100 );
if (b) {
  $( c );
}
else {
  const d = !c;
  a = d;
  $( d );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 100
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
