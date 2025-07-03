# Preval test case

# varred.md

> Array methods > Reduce > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.reduce($);
  $(x);
}
f();
$(f);
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceOut /*:unknown*/ = $dotCall($, undefined, undefined, 1, 2, 1, arr);
  const tmpLambdaReduceHas$2 /*:boolean*/ = 2 in arr;
  const tmpLambdaReduce1st /*:object*/ /*truthy*/ = {};
  if (tmpLambdaReduceHas$2) {
    const tmpLambdaReduceVal$2 /*:primitive*/ = arr[2];
    const tmpLambdaReduceBad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st;
    if (tmpLambdaReduceBad$2) {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = tmpLambdaReduceVal$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpClusterSSA_tmpLambdaReduceOut,
        tmpLambdaReduceVal$2,
        2,
        arr,
      );
    }
  } else {
  }
  const tmpLambdaReduceTTE /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st;
  if (tmpLambdaReduceTTE) {
    const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`const\\nx\$1\\n=\\n\$dotCall(\$array_reduce,\\narr,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpLambdaReduceErr;
  } else {
    $(tmpSSA_tmpClusterSSA_tmpLambdaReduceOut);
    return undefined;
  }
};
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall($, undefined, undefined, 1, 2, 1, arr);
  const tmpLambdaReduceHas$2 = 2 in arr;
  const tmpLambdaReduce1st = {};
  if (tmpLambdaReduceHas$2) {
    const tmpLambdaReduceVal$2 = arr[2];
    if (tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st) {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = tmpLambdaReduceVal$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpClusterSSA_tmpLambdaReduceOut,
        tmpLambdaReduceVal$2,
        2,
        arr,
      );
    }
  }
  if (tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st) {
    const tmpLambdaReduceErr = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`const\\nx\$1\\n=\\n\$dotCall(\$array_reduce,\\narr,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpLambdaReduceErr;
  } else {
    $(tmpSSA_tmpClusterSSA_tmpLambdaReduceOut);
  }
};
f();
$(f);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  let c = $dotCall( $, undefined, undefined, 1, 2, 1, b );
  const d = 2 in b;
  const e = {};
  if (d) {
    const f = b[ 2 ];
    const g = c === e;
    if (g) {
      c = f;
    }
    else {
      c = $dotCall( $, undefined, undefined, c, f, 2, b );
    }
  }
  const h = c === e;
  if (h) {
    const i = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nx$1\\n=\\n$dotCall($array_reduce,\\narr,\\n`reduce`,\\n$);`" );
    throw i;
  }
  else {
    $( c );
    return undefined;
  }
};
a();
$( a );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.reduce;
  const x$1 = $dotCall(tmpMCF, arr, `reduce`, $);
  $(x$1);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2, 1, [1, 2, 3]
 - 2: 1, 3, 2, [1, 2, 3]
 - 3: 1
 - 4: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
