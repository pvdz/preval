# Preval test case

# ctxt_opt_b_pass.md

> Normalize > Optional > Ctxt opt b pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a).b?.c(100));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ /*truthy*/ = { c: $ };
const a /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { c: $ };
const tmpChainElementObject = $({ b: tmpObjLitVal }).b;
if (tmpChainElementObject == null) {
  $(undefined);
} else {
  $(tmpChainElementObject.c(100));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = { b: a };
const c = $( b );
const d = c.b;
const e = d == null;
if (e) {
  $( undefined );
}
else {
  const f = d.c;
  const g = $dotCall( f, d, "c", 100 );
  $( g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  tmpCalleeParam = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
