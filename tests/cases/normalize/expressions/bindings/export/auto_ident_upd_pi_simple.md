# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident upd pi simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = ++b;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = ++b;
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
b = b + 1;
let a = b;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const a = 2;
export { a };
$(2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
