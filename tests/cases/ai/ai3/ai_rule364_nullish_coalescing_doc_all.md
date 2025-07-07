# Preval test case

# ai_rule364_nullish_coalescing_doc_all.md

> Ai > Ai3 > Ai rule364 nullish coalescing doc all
>
> Rule 364: Nullish coalescing with document.all

## Input

`````js filename=intro
(function() {
  let defaultVal = $('default', 'DEFAULT');
  let res;
  try {
    res = document.all ?? defaultVal;
    $('res_doc_all', res, typeof document.all, document.all == null);
  } catch(e) {
    $('doc_all_error', e.name);
    res = defaultVal;
    $('res_doc_all_error_case', res);
  }

  let definitelyNull = null;
  let resNull = definitelyNull ?? defaultVal;
  $('res_null', resNull);

  let definitelyUndefined = undefined;
  let resUndef = definitelyUndefined ?? defaultVal;
  $('res_undef', resUndef);

  let notNullish = $('not_nullish_val', 0);
  let resNotNullish = notNullish ?? defaultVal;
  $('res_not_nullish', resNotNullish);
})();
`````


## Settled


`````js filename=intro
const defaultVal /*:unknown*/ = $(`default`, `DEFAULT`);
try {
  const tmpClusterSSA_res /*:unknown*/ = document.all;
  const tmpIfTest /*:boolean*/ = tmpClusterSSA_res == null;
  let tmpCalleeParam /*:unknown*/ /*ternaryConst*/ = undefined;
  if (tmpIfTest) {
    tmpCalleeParam = defaultVal;
  } else {
    tmpCalleeParam = tmpClusterSSA_res;
  }
  const tmpUnaryArg /*:unknown*/ = document.all;
  const tmpBinLhs /*:unknown*/ = document.all;
  const tmpCalleeParam$3 /*:boolean*/ = tmpBinLhs == null;
  const tmpCalleeParam$1 /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
  $(`res_doc_all`, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
} catch (e) {
  const tmpCalleeParam$5 /*:unknown*/ = e.name;
  $(`doc_all_error`, tmpCalleeParam$5);
  $(`res_doc_all_error_case`, defaultVal);
}
$(`res_null`, defaultVal);
$(`res_undef`, defaultVal);
const resNotNullish /*:unknown*/ = $(`not_nullish_val`, 0);
const tmpIfTest$5 /*:boolean*/ = resNotNullish == null;
if (tmpIfTest$5) {
  $(`res_not_nullish`, defaultVal);
} else {
  $(`res_not_nullish`, resNotNullish);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const defaultVal = $(`default`, `DEFAULT`);
try {
  const tmpClusterSSA_res = document.all;
  const tmpIfTest = tmpClusterSSA_res == null;
  let tmpCalleeParam = undefined;
  if (tmpIfTest) {
    tmpCalleeParam = defaultVal;
  } else {
    tmpCalleeParam = tmpClusterSSA_res;
  }
  const tmpUnaryArg = document.all;
  const tmpCalleeParam$3 = document.all == null;
  $(`res_doc_all`, tmpCalleeParam, typeof tmpUnaryArg, tmpCalleeParam$3);
} catch (e) {
  $(`doc_all_error`, e.name);
  $(`res_doc_all_error_case`, defaultVal);
}
$(`res_null`, defaultVal);
$(`res_undef`, defaultVal);
const resNotNullish = $(`not_nullish_val`, 0);
if (resNotNullish == null) {
  $(`res_not_nullish`, defaultVal);
} else {
  $(`res_not_nullish`, resNotNullish);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "default", "DEFAULT" );
try {
  const b = document.all;
  const c = b == null;
  let d = undefined;
  if (c) {
    d = a;
  }
  else {
    d = b;
  }
  const e = document.all;
  const f = document.all;
  const g = f == null;
  const h = typeof e;
  $( "res_doc_all", d, h, g );
}
catch (i) {
  const j = i.name;
  $( "doc_all_error", j );
  $( "res_doc_all_error_case", a );
}
$( "res_null", a );
$( "res_undef", a );
const k = $( "not_nullish_val", 0 );
const l = k == null;
if (l) {
  $( "res_not_nullish", a );
}
else {
  $( "res_not_nullish", k );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let defaultVal = $(`default`, `DEFAULT`);
  let res = undefined;
  try {
    res = document.all;
    const tmpIfTest = res == null;
    if (tmpIfTest) {
      res = defaultVal;
    } else {
    }
    let tmpCalleeParam = res;
    const tmpUnaryArg = document.all;
    let tmpCalleeParam$1 = typeof tmpUnaryArg;
    const tmpBinLhs = document.all;
    let tmpCalleeParam$3 = tmpBinLhs == null;
    $(`res_doc_all`, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  } catch (e) {
    let tmpCalleeParam$5 = e.name;
    $(`doc_all_error`, tmpCalleeParam$5);
    res = defaultVal;
    $(`res_doc_all_error_case`, defaultVal);
  }
  let definitelyNull = null;
  let resNull = definitelyNull;
  const tmpIfTest$1 = resNull == null;
  if (tmpIfTest$1) {
    resNull = defaultVal;
    $(`res_null`, defaultVal);
  } else {
    $(`res_null`, resNull);
  }
  let definitelyUndefined = undefined;
  let resUndef = definitelyUndefined;
  const tmpIfTest$3 = resUndef == null;
  if (tmpIfTest$3) {
    resUndef = defaultVal;
    $(`res_undef`, defaultVal);
  } else {
    $(`res_undef`, resUndef);
  }
  let notNullish = $(`not_nullish_val`, 0);
  let resNotNullish = notNullish;
  const tmpIfTest$5 = resNotNullish == null;
  if (tmpIfTest$5) {
    resNotNullish = defaultVal;
    $(`res_not_nullish`, defaultVal);
    return undefined;
  } else {
    $(`res_not_nullish`, resNotNullish);
    return undefined;
  }
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? MemberExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'default', 'DEFAULT'
 - 2: 'doc_all_error', 'ReferenceError'
 - 3: 'res_doc_all_error_case', 'default'
 - 4: 'res_null', 'default'
 - 5: 'res_undef', 'default'
 - 6: 'not_nullish_val', 0
 - 7: 'res_not_nullish', 'not_nullish_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
