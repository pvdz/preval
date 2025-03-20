# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Call spread > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(...b?.c.d.e?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(...undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(...tmpChainElementCall);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(...undefined);
} else {
  const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
  $(...tmpChainElementCall);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( ...undefined );
}
else {
  const b = { e: $ };
  const c = $dotCall( $, b, "e", 1 );
  $( ...c );
}
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
