# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Export default > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(1)) && $($(1)) && $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $($(1)) && $($(1)) && $($(2));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpAnonDefaultExport = tmpCallCallee(tmpCalleeParam);
if (tmpAnonDefaultExport) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpAnonDefaultExport = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAnonDefaultExport) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpAnonDefaultExport = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpAnonDefaultExport /*:unknown*/ = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
  if (tmpAnonDefaultExport) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpAnonDefaultExport = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
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
