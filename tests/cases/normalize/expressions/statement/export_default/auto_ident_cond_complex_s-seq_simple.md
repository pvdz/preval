# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $(1) ? (40, 50, 60) : $($(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $(1) ? (40, 50, 60) : $($(100));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpAnonDefaultExport = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpAnonDefaultExport = tmpCallCallee(tmpCalleeParam);
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
let tmpAnonDefaultExport = 60;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpAnonDefaultExport = $(tmpCalleeParam);
}
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
export { a as default };
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
