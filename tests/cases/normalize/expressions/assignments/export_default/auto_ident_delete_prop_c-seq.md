# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Export default > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
export default a = delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
const SSA_a = delete tmpDeleteObj.y;
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
