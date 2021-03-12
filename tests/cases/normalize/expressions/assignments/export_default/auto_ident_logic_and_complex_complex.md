# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $($(1)) && $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
  const tmpCalleeParam$1 = $(2);
  SSA_a = $(tmpCalleeParam$1);
}
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
