# Preval test case

# base_var.md

> Normalize > Export > Named > Base var
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export var foo = 10;
$(foo);
`````

## Normalized

`````js filename=intro
let foo = undefined;
foo = 10;
$(foo);
export { foo };
`````

## Output

`````js filename=intro
const SSA_foo = 10;
$(10);
export { SSA_foo as foo };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
