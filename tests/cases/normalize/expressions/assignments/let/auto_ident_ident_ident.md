# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Let > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let xyz = (a = b = 2);
$(xyz);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
let xyz = (a = b = 2);
$(xyz);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let xyz = a;
$(xyz);
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
