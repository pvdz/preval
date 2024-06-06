# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident new complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = new ($($))(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = new ($($))(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
export { b as a from "undefined"
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
