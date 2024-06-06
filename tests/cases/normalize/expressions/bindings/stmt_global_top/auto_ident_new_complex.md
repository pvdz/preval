# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident new complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = new ($($))(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = new ($($))(1);
$(a);
`````

## Normalized


`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
