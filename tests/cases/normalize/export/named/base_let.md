# Preval test case

# base_let.md

> Normalize > Export > Named > Base let
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export let foo = 10;
$(foo);
`````

## Normalized

`````js filename=intro
let foo = 10;
export { foo };
$(foo);
`````

## Output

`````js filename=intro
const foo = 10;
export { foo };
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
