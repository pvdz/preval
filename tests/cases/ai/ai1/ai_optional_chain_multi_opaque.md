# Preval test case

# ai_optional_chain_multi_opaque.md

> Ai > Ai1 > Ai optional chain multi opaque
>
> Test: Chained optional chaining on opaque objects.

## Input

`````js filename=intro
// Expected: (Complex if structure, correct short-circuiting and value for x)
let x = $('obj1')?.prop1?.$('maybe_call_prop2')?.val;
$('use', x);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(`obj1`);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`use`, undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.prop1;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(`use`, undefined);
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.$;
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `\$`, `maybe_call_prop2`);
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$3) {
      $(`use`, undefined);
    } else {
      const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$1.val;
      $(`use`, tmpChainElementObject$3);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $(`obj1`);
if (tmpChainElementCall == null) {
  $(`use`, undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.prop1;
  if (tmpChainElementObject == null) {
    $(`use`, undefined);
  } else {
    const tmpChainElementCall$1 = tmpChainElementObject.$(`maybe_call_prop2`);
    if (tmpChainElementCall$1 == null) {
      $(`use`, undefined);
    } else {
      $(`use`, tmpChainElementCall$1.val);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "obj1" );
const b = a == null;
if (b) {
  $( "use", undefined );
}
else {
  const c = a.prop1;
  const d = c == null;
  if (d) {
    $( "use", undefined );
  }
  else {
    const e = c.$;
    const f = $dotCall( e, c, "$", "maybe_call_prop2" );
    const g = f == null;
    if (g) {
      $( "use", undefined );
    }
    else {
      const h = f.val;
      $( "use", h );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(`obj1`);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.prop1;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.$;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `\$`, `maybe_call_prop2`);
    const tmpIfTest$3 = tmpChainElementCall$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$3 = tmpChainElementCall$1.val;
      x = tmpChainElementObject$3;
      $(`use`, tmpChainElementObject$3);
    } else {
      $(`use`, x);
    }
  } else {
    $(`use`, x);
  }
} else {
  $(`use`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj1'
 - 2: 'use', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
