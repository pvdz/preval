# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
({ ...$(b)?.[$("x")] });
$(a);
`````

## Settled


`````js filename=intro
let tmpObjSpreadArg /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  tmpObjSpreadArg = tmpChainElementObject;
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpObjSpreadArg = undefined;
const tmpChainElementCall = $({ x: 1 });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpObjSpreadArg = tmpChainElementCall[tmpChainRootComputed];
}
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
({ ...$(b)?.[$(`x`)] });
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpObjSpreadArg = tmpChainElementObject;
} else {
}
({ ...tmpObjSpreadArg });
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
{ ... a };
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
