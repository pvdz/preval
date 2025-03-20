# Preval test case

# if_spread_undefined.md

> Tofix > if spread undefined

Existing test.

When one branch leads to a crash we should maybe inline that?

In this case, tmpArrSpread starts as undefined. If tmpIfTest then it invariably
leads to `[...undefined]` which is a predictable crash. So we can pull them into
each branch of the `if` and resolve them accordingly.

## Input

`````js filename=intro
let a = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpArrSpread /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
let tmpArrSpread = undefined;
if (!tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpArrSpread = tmpChainElementObject;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {

}
else {
  const f = c.x;
  a = f;
  e = f;
}
const g = [ ...e ];
$( g );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
