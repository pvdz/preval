# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident unary plus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = +arg);
$(xyz);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let xyz = (a = +arg);
$(xyz);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = +arg;
let xyz = a;
$(xyz);
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
