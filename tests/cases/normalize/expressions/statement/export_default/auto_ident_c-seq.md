# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > statement > export_default > auto_ident_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default ($(1), $(2), $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpExportDefault = $(x);
export default tmpExportDefault;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpExportDefault = $(1);
export default tmpExportDefault;
$(a, 1);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
