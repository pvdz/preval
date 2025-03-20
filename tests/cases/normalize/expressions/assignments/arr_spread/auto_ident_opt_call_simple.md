# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $?.(1))]);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpArrSpread /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpArrSpread = tmpChainElementCall;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpArrSpread = undefined;
if (!($ == null)) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpArrSpread = tmpChainElementCall;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
const e = [ ...b ];
$( e );
$( a );
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
