# Preval test case

# prop_call.md

> Normalize > Optional > Prop call
>
> Computed member sets context so should be kept

## Input

`````js filename=intro
const a = {
  x: function(...args){ $(args, this.y); },
  y: 100,
};
$(a).x?.(1, 2, 3);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis /*:object*/ = this;
  const args /*:array*/ = $$0;
  debugger;
  const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.y;
  $(args, tmpCalleeParam$1);
  return undefined;
};
const a /*:object*/ = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  $dotCall(tmpChainElementObject, tmpChainElementCall, `x`, 1, 2, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function (args) {
  const tmpPrevalAliasThis = this;
  $(args, tmpPrevalAliasThis.y);
};
const tmpChainElementCall = $({ x: tmpObjLitVal, y: 100 });
const tmpChainElementObject = tmpChainElementCall.x;
if (!(tmpChainElementObject == null)) {
  $dotCall(tmpChainElementObject, tmpChainElementCall, `x`, 1, 2, 3);
}
`````

## Pre Normal


`````js filename=intro
const a = {
  x: function (...$$0 /*:array*/) {
    const tmpPrevalAliasThis = this;
    let args = $$0;
    debugger;
    $(args, tmpPrevalAliasThis.y);
  },
  y: 100,
};
$(a).x?.(1, 2, 3);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis = this;
  let args = $$0;
  debugger;
  const tmpCalleeParam = args;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  $(tmpCalleeParam, tmpCalleeParam$1);
  return undefined;
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, `x`, 1, 2, 3);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  const d = b.y;
  $( c, d );
  return undefined;
};
const e = {
  x: a,
  y: 100,
};
const f = $( e );
const g = f.x;
const h = g == null;
if (h) {

}
else {
  $dotCall( g, f, "x", 1, 2, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '"<function>"', y: '100' }
 - 2: [1, 2, 3], 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - 1: { x: '"<function>"', y: '100' }
 - 2: 1, 100
 - eval returned: undefined
