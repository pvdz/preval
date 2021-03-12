# Preval test case

# base_ident_const.md

> Normalize > Export > Default > Base ident const
>
> Exporting a value

#TODO

## Input

`````js filename=intro
const FOO = $(1);

export default FOO;
`````

## Normalized

`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
