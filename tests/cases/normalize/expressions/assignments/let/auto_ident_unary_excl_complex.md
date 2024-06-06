# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Let > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = !$(100));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = !$(100));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let xyz = a;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
$( b );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
