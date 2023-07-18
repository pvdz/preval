# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Bindings > Export > Auto ident object empty
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = {};
$(a);
`````

## Pre Normal

`````js filename=intro
let a = {};
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = {};
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = {};
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
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
