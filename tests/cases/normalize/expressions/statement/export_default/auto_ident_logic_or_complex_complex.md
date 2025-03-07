# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(0)) || $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpAnonDefaultExport /*:unknown*/ = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
}
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = $($(0));
if (!tmpAnonDefaultExport) {
  tmpAnonDefaultExport = $($(2));
}
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $($(0)) || $($(2));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpAnonDefaultExport = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
export { b as default };
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
