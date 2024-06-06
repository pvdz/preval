# Preval test case

# base_const.md

> Normalize > Export > Named > Base const
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export const foo = 10;
$(foo);
`````

## Pre Normal


`````js filename=intro
const foo = 10;
export { foo };
$(foo);
`````

## Normalized


`````js filename=intro
const foo = 10;
export { foo };
$(foo);
`````

## Output


`````js filename=intro
const foo = 10;
export { foo };
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 10;
export { a as foo from "undefined"
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
