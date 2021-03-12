# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = $(b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
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
