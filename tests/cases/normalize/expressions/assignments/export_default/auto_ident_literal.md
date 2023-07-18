# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Export default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = "foo";
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = `foo`);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = `foo`;
export { tmpAnonDefaultExport as default };
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "foo";
export { a as default from "undefined"
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
