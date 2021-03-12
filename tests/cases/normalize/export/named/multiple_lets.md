# Preval test case

# multiple_lets.md

> Normalize > Export > Named > Multiple lets
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export let a = 10, b = 20;
`````

## Normalized

`````js filename=intro
let a = 10;
let b = 20;
export { a, b };
`````

## Output

`````js filename=intro
const a = 10;
const b = 20;
export { a, b };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same