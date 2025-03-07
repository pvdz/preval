# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 1 && $($(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = 1;
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = 1;
const a = $($(1));
tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = 1 && $($(1)));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
} else {
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
const c = $( b );
a = c;
export { a as default };
$( c );
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
