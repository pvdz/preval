# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(1)) && $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpAnonDefaultExport /*:unknown*/ = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
} else {
}
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = $($(1));
if (tmpAnonDefaultExport) {
  tmpAnonDefaultExport = $($(2));
}
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $($(1)) && $($(2));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpAnonDefaultExport = $(tmpCalleeParam);
if (tmpAnonDefaultExport) {
  const tmpCalleeParam$1 = $(2);
  tmpAnonDefaultExport = $(tmpCalleeParam$1);
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
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
