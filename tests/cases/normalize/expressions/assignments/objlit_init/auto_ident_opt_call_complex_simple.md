# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $($)?.(1)) });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpObjLitVal /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  tmpObjLitVal = tmpChainElementCall$1;
}
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpObjLitVal = undefined;
if (!tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  tmpObjLitVal = tmpChainElementCall$1;
}
$({ x: tmpObjLitVal });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $dotCall( b, $, undefined, 1 );
  a = e;
  d = e;
}
const f = { x: d };
$( f );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
