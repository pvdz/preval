# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = ($(1), $(2), $(x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = ($(1), $(2), $(x));
export { a };
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
$(1);
$(2);
let a = $(x);
export { a };
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const a = $(1);
export { a };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
