# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = $(b)?.[$("x")];
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
}
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $({ x: 1 });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
}
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = $(b)?.[$(`x`)];
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  const f = c[ e ];
  a = f;
}
export { a as a };
$( a );
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
