# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Export > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = /foo/;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = /foo/;
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = /foo/;
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = /foo/;
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
