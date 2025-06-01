# Preval test case

# ai_rule374_opt_chain_delete.md

> Ai > Ai3 > Ai rule374 opt chain delete
>
> Rule 374: Optional chaining with delete

## Input

`````js filename=intro
(function() {
  let obj1 = { b: { key: $('val1', 10) } };
  let obj2 = null;
  let obj3 = { b: { key: $('val2', 20) } };
  let obj4 = { b: {} }; // key is not present

  // Test 1: Delete existing property via optional chain
  let res1 = delete obj1?.b?.key;
  $('res1', res1, obj1.b.hasOwnProperty('key'));

  // Test 2: Delete on null base
  let res2 = delete obj2?.b?.key;
  $('res2', res2);

  // Test 3: Delete on potentially undefined intermediate property (obj3.c is undef)
  let res3 = delete obj3?.c?.key;
  $('res3', res3);
  
  // Test 4: Delete property that does not exist on existing object path
  let res4 = delete obj4?.b?.non_existent_key;
  $('res4', res4, 'non_existent_key' in obj4.b);

  // Test 5: Optional chain on LHS of delete is not allowed syntax
  // delete obj1?.b = 1; // This is a SyntaxError
  $('syntax_note', 'delete (obj?.prop) is valid, (delete obj?.prop) = x is not.');

  // Test 6: Opaque base
  let opaqueObj = $('get_obj', { b: { key: 30 } } );
  let res6 = delete opaqueObj?.b?.key;
  $('res6', res6, typeof opaqueObj, opaqueObj?.b?.key);
})();
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(`val1`, 10);
$(`val2`, 20);
const tmpObjLitVal /*:object*/ = { key: tmpObjLitVal$1 };
const tmpSSA_tmpCalleeParam /*:boolean*/ = delete tmpObjLitVal.key;
const tmpCalleeParam$1 /*:boolean*/ = $dotCall($object_hasOwnProperty, tmpObjLitVal, `hasOwnProperty`, `key`);
$(`res1`, tmpSSA_tmpCalleeParam, tmpCalleeParam$1);
$(`res2`, true);
const tmpClusterSSA_tmpDeleteOpt$3 /*:unknown*/ = $Object_prototype.c;
const tmpIfTest$9 /*:boolean*/ = tmpClusterSSA_tmpDeleteOpt$3 == null;
if (tmpIfTest$9) {
  $(`res3`, true);
} else {
  const tmpClusterSSA_res3 /*:boolean*/ = delete tmpClusterSSA_tmpDeleteOpt$3.key;
  $(`res3`, tmpClusterSSA_res3);
}
const tmpObjLitVal$7 /*:object*/ = {};
const tmpSSA_tmpCalleeParam$3 /*:boolean*/ = delete tmpObjLitVal$7.non_existent_key;
const tmpCalleeParam$5 /*:boolean*/ = `non_existent_key` in tmpObjLitVal$7;
$(`res4`, tmpSSA_tmpCalleeParam$3, tmpCalleeParam$5);
$(`syntax_note`, `delete (obj?.prop) is valid, (delete obj?.prop) = x is not.`);
const tmpObjLitVal$9 /*:object*/ = { key: 30 };
const tmpCalleeParam$7 /*:object*/ = { b: tmpObjLitVal$9 };
const opaqueObj /*:unknown*/ = $(`get_obj`, tmpCalleeParam$7);
let tmpDeleteOpt$7 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$15 /*:boolean*/ = opaqueObj == null;
let tmpIfTest$17 /*:boolean*/ /*ternaryConst*/ = true;
if (tmpIfTest$15) {
} else {
  tmpDeleteOpt$7 = opaqueObj.b;
  tmpIfTest$17 = tmpDeleteOpt$7 == null;
}
let tmpCalleeParam$9 /*:boolean*/ /*ternaryConst*/ = true;
if (tmpIfTest$17) {
} else {
  tmpCalleeParam$9 = delete tmpDeleteOpt$7.key;
}
const tmpIfTest$19 /*:boolean*/ = opaqueObj == null;
const tmpCalleeParam$11 /*:string*/ = typeof opaqueObj;
if (tmpIfTest$19) {
  $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = opaqueObj.b;
  const tmpIfTest$21 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$21) {
    $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, undefined);
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.key;
    $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, tmpChainElementObject$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $(`val1`, 10);
$(`val2`, 20);
const tmpObjLitVal = { key: tmpObjLitVal$1 };
$(`res1`, delete tmpObjLitVal.key, $dotCall($object_hasOwnProperty, tmpObjLitVal, `hasOwnProperty`, `key`));
$(`res2`, true);
const tmpClusterSSA_tmpDeleteOpt$3 = $Object_prototype.c;
if (tmpClusterSSA_tmpDeleteOpt$3 == null) {
  $(`res3`, true);
} else {
  $(`res3`, delete tmpClusterSSA_tmpDeleteOpt$3.key);
}
const tmpObjLitVal$7 = {};
$(`res4`, delete tmpObjLitVal$7.non_existent_key, `non_existent_key` in tmpObjLitVal$7);
$(`syntax_note`, `delete (obj?.prop) is valid, (delete obj?.prop) = x is not.`);
const tmpObjLitVal$9 = { key: 30 };
const opaqueObj = $(`get_obj`, { b: tmpObjLitVal$9 });
let tmpDeleteOpt$7 = undefined;
const tmpIfTest$15 = opaqueObj == null;
let tmpIfTest$17 = true;
if (!tmpIfTest$15) {
  tmpDeleteOpt$7 = opaqueObj.b;
  tmpIfTest$17 = tmpDeleteOpt$7 == null;
}
let tmpCalleeParam$9 = true;
if (!tmpIfTest$17) {
  tmpCalleeParam$9 = delete tmpDeleteOpt$7.key;
}
const tmpIfTest$19 = opaqueObj == null;
const tmpCalleeParam$11 = typeof opaqueObj;
if (tmpIfTest$19) {
  $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, undefined);
} else {
  const tmpChainElementObject = opaqueObj.b;
  if (tmpChainElementObject == null) {
    $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, undefined);
  } else {
    $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, tmpChainElementObject.key);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val1", 10 );
$( "val2", 20 );
const b = { key: a };
const c = delete b.key;
const d = $dotCall( $object_hasOwnProperty, b, "hasOwnProperty", "key" );
$( "res1", c, d );
$( "res2", true );
const e = $Object_prototype.c;
const f = e == null;
if (f) {
  $( "res3", true );
}
else {
  const g = delete e.key;
  $( "res3", g );
}
const h = {};
const i = delete h.non_existent_key;
const j = "non_existent_key" in h;
$( "res4", i, j );
$( "syntax_note", "delete (obj?.prop) is valid, (delete obj?.prop) = x is not." );
const k = { key: 30 };
const l = { b: k };
const m = $( "get_obj", l );
let n = undefined;
const o = m == null;
let p = true;
if (o) {

}
else {
  n = m.b;
  p = n == null;
}
let q = true;
if (p) {

}
else {
  q = delete n.key;
}
const r = m == null;
const s = typeof m;
if (r) {
  $( "res6", q, s, undefined );
}
else {
  const t = m.b;
  const u = t == null;
  if (u) {
    $( "res6", q, s, undefined );
  }
  else {
    const v = t.key;
    $( "res6", q, s, v );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  const tmpObjLitVal$1 = $(`val1`, 10);
  const tmpObjLitVal = { key: tmpObjLitVal$1 };
  let obj1 = { b: tmpObjLitVal };
  let obj2 = null;
  const tmpObjLitVal$5 = $(`val2`, 20);
  const tmpObjLitVal$3 = { key: tmpObjLitVal$5 };
  let obj3 = { b: tmpObjLitVal$3 };
  const tmpObjLitVal$7 = {};
  let obj4 = { b: tmpObjLitVal$7 };
  const tmpOptObj = obj1;
  let tmpDeleteOpt = undefined;
  const tmpIfTest = tmpOptObj == null;
  if (tmpIfTest) {
    tmpDeleteOpt = undefined;
  } else {
    tmpDeleteOpt = tmpOptObj.b;
  }
  let res1 = true;
  const tmpIfTest$1 = tmpDeleteOpt != null;
  if (tmpIfTest$1) {
    res1 = delete tmpDeleteOpt.key;
  } else {
  }
  let tmpCalleeParam = res1;
  const tmpMCOO = obj1.b;
  const tmpMCF = tmpMCOO.hasOwnProperty;
  let tmpCalleeParam$1 = $dotCall(tmpMCF, tmpMCOO, `hasOwnProperty`, `key`);
  $(`res1`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpOptObj$1 = obj2;
  let tmpDeleteOpt$1 = undefined;
  const tmpIfTest$3 = tmpOptObj$1 == null;
  if (tmpIfTest$3) {
    tmpDeleteOpt$1 = undefined;
  } else {
    tmpDeleteOpt$1 = tmpOptObj$1.b;
  }
  let res2 = true;
  const tmpIfTest$5 = tmpDeleteOpt$1 != null;
  if (tmpIfTest$5) {
    res2 = delete tmpDeleteOpt$1.key;
    $(`res2`, res2);
  } else {
    $(`res2`, res2);
  }
  const tmpOptObj$3 = obj3;
  let tmpDeleteOpt$3 = undefined;
  const tmpIfTest$7 = tmpOptObj$3 == null;
  if (tmpIfTest$7) {
    tmpDeleteOpt$3 = undefined;
  } else {
    tmpDeleteOpt$3 = tmpOptObj$3.c;
  }
  let res3 = true;
  const tmpIfTest$9 = tmpDeleteOpt$3 != null;
  if (tmpIfTest$9) {
    res3 = delete tmpDeleteOpt$3.key;
    $(`res3`, res3);
  } else {
    $(`res3`, res3);
  }
  const tmpOptObj$5 = obj4;
  let tmpDeleteOpt$5 = undefined;
  const tmpIfTest$11 = tmpOptObj$5 == null;
  if (tmpIfTest$11) {
    tmpDeleteOpt$5 = undefined;
  } else {
    tmpDeleteOpt$5 = tmpOptObj$5.b;
  }
  let res4 = true;
  const tmpIfTest$13 = tmpDeleteOpt$5 != null;
  if (tmpIfTest$13) {
    res4 = delete tmpDeleteOpt$5.non_existent_key;
  } else {
  }
  let tmpCalleeParam$3 = res4;
  const tmpBinBothLhs = `non_existent_key`;
  const tmpBinBothRhs = obj4.b;
  let tmpCalleeParam$5 = tmpBinBothLhs in tmpBinBothRhs;
  $(`res4`, tmpCalleeParam$3, tmpCalleeParam$5);
  $(`syntax_note`, `delete (obj?.prop) is valid, (delete obj?.prop) = x is not.`);
  const tmpObjLitVal$9 = { key: 30 };
  let tmpCalleeParam$7 = { b: tmpObjLitVal$9 };
  let opaqueObj = $(`get_obj`, tmpCalleeParam$7);
  const tmpOptObj$7 = opaqueObj;
  let tmpDeleteOpt$7 = undefined;
  const tmpIfTest$15 = tmpOptObj$7 == null;
  if (tmpIfTest$15) {
    tmpDeleteOpt$7 = undefined;
  } else {
    tmpDeleteOpt$7 = tmpOptObj$7.b;
  }
  let res6 = true;
  const tmpIfTest$17 = tmpDeleteOpt$7 != null;
  if (tmpIfTest$17) {
    res6 = delete tmpDeleteOpt$7.key;
  } else {
  }
  let tmpCalleeParam$9 = res6;
  let tmpCalleeParam$11 = typeof opaqueObj;
  let tmpCalleeParam$13 = undefined;
  const tmpChainRootProp = opaqueObj;
  const tmpIfTest$19 = tmpChainRootProp != null;
  if (tmpIfTest$19) {
    const tmpChainElementObject = tmpChainRootProp.b;
    const tmpIfTest$21 = tmpChainElementObject != null;
    if (tmpIfTest$21) {
      const tmpChainElementObject$1 = tmpChainElementObject.key;
      tmpCalleeParam$13 = tmpChainElementObject$1;
      $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, tmpChainElementObject$1);
      return undefined;
    } else {
      $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
      return undefined;
    }
  } else {
    $(`res6`, tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
    return undefined;
  }
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_hasOwnProperty
- (todo) type trackeed tricks can possibly support static $object_hasOwnProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val1', 10
 - 2: 'val2', 20
 - 3: 'res1', true, false
 - 4: 'res2', true
 - 5: 'res3', true
 - 6: 'res4', true, false
 - 7: 'syntax_note', 'delete (obj?.prop) is valid, (delete obj?.prop) = x is not.'
 - 8: 'get_obj', { b: '{"key":"30"}' }
 - 9: 'res6', true, 'string', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
