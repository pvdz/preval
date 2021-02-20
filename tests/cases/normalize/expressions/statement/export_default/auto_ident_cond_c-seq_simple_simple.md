# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default (10, 20, $(30)) ? $(2) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpExportDefault = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpExportDefault = tmpCallCallee(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpExportDefault = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpExportDefault = $(2);
} else {
  const tmpCalleeParam = $(100);
  tmpExportDefault = $(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
