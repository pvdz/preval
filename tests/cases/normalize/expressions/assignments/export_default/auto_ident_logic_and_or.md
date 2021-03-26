# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = ($($(1)) && $($(1))) || $($(2)));
export { tmpAnonDefaultExport as default };
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
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
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
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
}
if (SSA_a) {
} else {
  const tmpCalleeParam$3 = $(2);
  SSA_a = $(tmpCalleeParam$3);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
