# Preval test case

# ai_rule358_opt_chain_func_result.md

> Ai > Ai3 > Ai rule358 opt chain func result
>
> Rule 358: Optional chaining on function call result

## Input

`````js filename=intro
(function() {
  function getObj(makeNull) {
    $('getObj_called', makeNull);
    return makeNull ? null : { prop: $('prop_val', 123) };
  }
  let res1 = getObj(false)?.prop;
  $('res1', res1);
  let res2 = getObj(true)?.prop;
  $('res2', res2);
  let res3 = getObj($('opaque_bool'))?.prop;
  $('res3', res3);
})();
`````


## Settled


`````js filename=intro
const getObj /*:(unknown)=>unknown*/ = function ($$0) {
  const makeNull /*:unknown*/ = $$0;
  debugger;
  $(`getObj_called`, makeNull);
  if (makeNull) {
    return null;
  } else {
    const tmpObjLitVal /*:unknown*/ = $(`prop_val`, 123);
    const tmpClusterSSA_tmpReturnArg /*:object*/ = { prop: tmpObjLitVal };
    return tmpClusterSSA_tmpReturnArg;
  }
};
const tmpChainElementCall /*:unknown*/ = getObj(false);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`res1`, undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.prop;
  $(`res1`, tmpChainElementObject);
}
const tmpChainElementCall$1 /*:unknown*/ = getObj(true);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
  $(`res2`, undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.prop;
  $(`res2`, tmpChainElementObject$1);
}
const tmpCalleeParam /*:unknown*/ = $(`opaque_bool`);
const tmpChainElementCall$3 /*:unknown*/ = getObj(tmpCalleeParam);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$3) {
  $(`res3`, undefined);
} else {
  const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$3.prop;
  $(`res3`, tmpChainElementObject$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const getObj = function (makeNull) {
  $(`getObj_called`, makeNull);
  if (makeNull) {
    return null;
  } else {
    const tmpObjLitVal = $(`prop_val`, 123);
    const tmpClusterSSA_tmpReturnArg = { prop: tmpObjLitVal };
    return tmpClusterSSA_tmpReturnArg;
  }
};
const tmpChainElementCall = getObj(false);
if (tmpChainElementCall == null) {
  $(`res1`, undefined);
} else {
  $(`res1`, tmpChainElementCall.prop);
}
const tmpChainElementCall$1 = getObj(true);
if (tmpChainElementCall$1 == null) {
  $(`res2`, undefined);
} else {
  $(`res2`, tmpChainElementCall$1.prop);
}
const tmpChainElementCall$3 = getObj($(`opaque_bool`));
if (tmpChainElementCall$3 == null) {
  $(`res3`, undefined);
} else {
  $(`res3`, tmpChainElementCall$3.prop);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "getObj_called", b );
  if (b) {
    return null;
  }
  else {
    const c = $( "prop_val", 123 );
    const d = { prop: c };
    return d;
  }
};
const e = a( false );
const f = e == null;
if (f) {
  $( "res1", undefined );
}
else {
  const g = e.prop;
  $( "res1", g );
}
const h = a( true );
const i = h == null;
if (i) {
  $( "res2", undefined );
}
else {
  const j = h.prop;
  $( "res2", j );
}
const k = $( "opaque_bool" );
const l = a( k );
const m = l == null;
if (m) {
  $( "res3", undefined );
}
else {
  const n = l.prop;
  $( "res3", n );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let getObj = function ($$0) {
    let makeNull = $$0;
    debugger;
    $(`getObj_called`, makeNull);
    let tmpReturnArg = undefined;
    if (makeNull) {
      tmpReturnArg = null;
      return tmpReturnArg;
    } else {
      const tmpObjLitVal = $(`prop_val`, 123);
      tmpReturnArg = { prop: tmpObjLitVal };
      return tmpReturnArg;
    }
  };
  let res1 = undefined;
  const tmpChainRootCall = getObj;
  const tmpChainElementCall = getObj(false);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.prop;
    res1 = tmpChainElementObject;
    $(`res1`, tmpChainElementObject);
  } else {
    $(`res1`, res1);
  }
  let res2 = undefined;
  const tmpChainRootCall$1 = getObj;
  const tmpChainElementCall$1 = getObj(true);
  const tmpIfTest$1 = tmpChainElementCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.prop;
    res2 = tmpChainElementObject$1;
    $(`res2`, tmpChainElementObject$1);
  } else {
    $(`res2`, res2);
  }
  let res3 = undefined;
  const tmpChainRootCall$3 = getObj;
  const tmpCallCallee = tmpChainRootCall$3;
  let tmpCalleeParam = $(`opaque_bool`);
  const tmpChainElementCall$3 = tmpChainRootCall$3(tmpCalleeParam);
  const tmpIfTest$3 = tmpChainElementCall$3 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$3 = tmpChainElementCall$3.prop;
    res3 = tmpChainElementObject$3;
    $(`res3`, tmpChainElementObject$3);
    return undefined;
  } else {
    $(`res3`, res3);
    return undefined;
  }
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getObj_called', false
 - 2: 'prop_val', 123
 - 3: 'res1', 'prop_val'
 - 4: 'getObj_called', true
 - 5: 'res2', undefined
 - 6: 'opaque_bool'
 - 7: 'getObj_called', 'opaque_bool'
 - 8: 'res3', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
