# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...$?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  $(...undefined);
} else {
  const tmpCalleeParamSpread /*:unknown*/ = $(1);
  $(...tmpCalleeParamSpread);
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
  const tmpCalleeParamSpread = $(1);
  $(...tmpCalleeParamSpread);
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
  const b = $( 1 );
  $( ...b );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Todos triggered


None


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
