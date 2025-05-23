# Preval test case

# ctxt_opt_a_pass.md

> Normalize > Optional > Ctxt opt a pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: function(...a){ $($(a), this); return a[0]; }}};
$($(a)?.b.c(100));
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:(array)=>unknown*/ = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis /*:object*/ = this;
  const a$1 /*:array*/ = $$0;
  debugger;
  const tmpCalleeParam /*:unknown*/ = $(a$1);
  $(tmpCalleeParam, tmpPrevalAliasThis);
  const tmpReturnArg /*:unknown*/ = a$1[0];
  return tmpReturnArg;
};
const tmpObjLitVal /*:object*/ = { c: tmpObjLitVal$1 };
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis = this;
  const a$1 = $$0;
  $($(a$1), tmpPrevalAliasThis);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.b;
  $(tmpChainElementObject.c(100));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  const d = $( c );
  $( d, b );
  const e = c[ 0 ];
  return e;
};
const f = { c: a };
const g = { b: f };
const h = $( g );
const i = h == null;
if (i) {
  $( undefined );
}
else {
  const j = h.b;
  const k = j.c;
  const l = $dotCall( k, j, "c", 100 );
  $( l );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis = this;
  let a$1 = $$0;
  debugger;
  let tmpCalleeParam = $(a$1);
  let tmpCalleeParam$1 = tmpPrevalAliasThis;
  $(tmpCalleeParam, tmpPrevalAliasThis);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam$3 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  tmpCalleeParam$3 = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
} else {
  $(tmpCalleeParam$3);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '{"c":"\\"<function>\\""}' }
 - 2: [100]
 - 3: [100], { c: '"<function>"' }
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
