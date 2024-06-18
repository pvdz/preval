# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Export default > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $($(0)) || $($(1)) || $($(2));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpAnonDefaultExport = tmpCallCallee(tmpCalleeParam);
if (tmpAnonDefaultExport) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpAnonDefaultExport = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAnonDefaultExport) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpAnonDefaultExport = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpAnonDefaultExport = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
  if (tmpAnonDefaultExport) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpAnonDefaultExport = $(tmpCalleeParam$3);
  }
}
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
export { b as default };
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
