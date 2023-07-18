# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Bindings > Export > Auto ident call ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $(1);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = $(1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
export { a as a from "undefined"
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
