# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) || (a = b = 2));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$((a = b = 2) || (a = b = 2));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  b = 2;
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
$(2);
$(2, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$( 2, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
