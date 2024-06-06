# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) && (a = typeof $(x)));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(x)) && (a = typeof $(x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(x);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
let a = typeof tmpUnaryArg;
const tmpCalleeParam = a;
if (a) {
  const tmpUnaryArg$1 = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = typeofa;
const c = b;
if (b) {
  const d = $( 1 );
  const e = typeofd;
  b = e;
  $( e );
}
else {
  $( c );
}
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'number'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
