# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...$?.(1) });
$(a);
`````

## Settled


`````js filename=intro
let tmpObjSpreadArg /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpObjSpreadArg = tmpChainElementCall;
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpObjSpreadArg = undefined;
if (!($ == null)) {
  tmpObjSpreadArg = $(1);
}
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...$?.(1) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpObjSpreadArg = tmpChainElementCall;
} else {
}
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
{ ... a };
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
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
