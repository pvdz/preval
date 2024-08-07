# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Let > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = void $(100));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = void $(100));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let xyz = a;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
$(100);
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( undefined );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
