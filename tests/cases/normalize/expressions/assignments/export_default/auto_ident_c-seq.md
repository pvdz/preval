# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Export default > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default a = ($(1), $(2), $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const SSA_a = $(1);
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
