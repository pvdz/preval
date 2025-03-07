# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $($(0)) || 2;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam);
let tmpAnonDefaultExport /*:unknown*/ = 2;
if (a) {
  tmpAnonDefaultExport = a;
} else {
  a = 2;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpAnonDefaultExport = 2;
if (a) {
  tmpAnonDefaultExport = a;
} else {
  a = 2;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = $($(0)) || 2);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
a = $(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = 2;
if (b) {
  c = b;
}
else {
  b = 2;
}
export { c as default };
$( b );
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
