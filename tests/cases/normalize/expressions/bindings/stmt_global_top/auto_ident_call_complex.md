# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident call complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = $($)(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $($)(1);
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallComplexCallee = $($);
let a = tmpCallComplexCallee(1);
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee = $($);
const a = tmpCallComplexCallee(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
