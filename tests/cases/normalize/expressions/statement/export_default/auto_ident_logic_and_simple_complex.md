# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default 1 && $($(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = 1 && $($(1));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = 1;
if (tmpAnonDefaultExport) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpAnonDefaultExport = tmpCallCallee(tmpCalleeParam);
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = 1;
const tmpCalleeParam = $(1);
tmpAnonDefaultExport = $(tmpCalleeParam);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
