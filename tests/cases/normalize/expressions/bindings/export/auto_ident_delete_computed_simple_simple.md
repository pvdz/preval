# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete arg["y"];
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = delete arg[`y`];
export { a };
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = delete arg.y;
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
export { a };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = deletea.y;
export { b as a from "undefined"
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
