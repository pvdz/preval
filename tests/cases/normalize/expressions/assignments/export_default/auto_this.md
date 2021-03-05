# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Export default > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = this;
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = this;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
const tmpExportDefault = SSA_a;
export { tmpExportDefault as default };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
