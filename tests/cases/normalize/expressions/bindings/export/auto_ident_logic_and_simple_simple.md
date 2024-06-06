# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 && 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = 1 && 2;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = 1;
if (a) {
  a = 2;
} else {
}
export { a };
$(a);
`````

## Output


`````js filename=intro
const a = 2;
export { a };
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 2;
export { a as a from "undefined"
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
