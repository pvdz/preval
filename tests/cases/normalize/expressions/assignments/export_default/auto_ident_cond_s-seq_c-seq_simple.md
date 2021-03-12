# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const SSA_a = $(60);
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
