# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) && (a = -$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) && (a = -$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (a) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = -a;
let c = b;
if (b) {
  const d = $( 100 );
  const e = -d;
  b = e;
  c = e;
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
 - 1: 100
 - 2: 100
 - 3: -100
 - 4: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
