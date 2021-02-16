# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > bindings > export > auto_ident_array_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = [$(1), 2, $(3)];
$(a);
`````

## Normalized

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$2];
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
