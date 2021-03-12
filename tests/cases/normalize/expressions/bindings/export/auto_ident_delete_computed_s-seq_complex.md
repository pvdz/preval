# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident delete computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = delete ($(1), $(2), arg)[$('y')];
export { a };
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(2);
const tmpDeleteCompProp = $('y');
const a = delete arg[tmpDeleteCompProp];
export { a };
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
