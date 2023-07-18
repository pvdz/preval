# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = $(b)) && (a = $(b)));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = $(b)) && (a = $(b)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = $(b);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = $(b);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = $(1);
const tmpCalleeParam = a;
if (a) {
  const tmpNestedComplexRhs = $(1);
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
let a = $( 1 );
const b = a;
if (a) {
  const c = $( 1 );
  a = c;
  $( c );
}
else {
  $( b );
}
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
