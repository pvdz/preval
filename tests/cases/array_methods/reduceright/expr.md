# Preval test case

# expr.md

> Array methods > Reduceright > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.reduceRight($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, 1, arr);
  const tmpLambdaReduceRightHas$2 /*:boolean*/ = 0 in arr;
  const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 /*:primitive*/ = arr[0];
    const tmpLambdaReduceRightBad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
    if (tmpLambdaReduceRightBad$2) {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut,
        tmpLambdaReduceRightVal$2,
        0,
        arr,
      );
    }
  } else {
  }
  const tmpLambdaReduceRightTTE /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
  if (tmpLambdaReduceRightTTE) {
    const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`\$dotCall(\$array_reduceRight,\\narr,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  } else {
    return undefined;
  }
};
f();
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall($, undefined, undefined, 3, 2, 1, arr);
  const tmpLambdaReduceRightHas$2 = 0 in arr;
  const tmpLambdaReduceRight1st = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 = arr[0];
    if (tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut,
        tmpLambdaReduceRightVal$2,
        0,
        arr,
      );
    }
  }
  if (tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
    const tmpLambdaReduceRightErr = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`\$dotCall(\$array_reduceRight,\\narr,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  }
};
f();
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  let c = $dotCall( $, undefined, undefined, 3, 2, 1, b );
  const d = 0 in b;
  const e = {};
  if (d) {
    const f = b[ 0 ];
    const g = c === e;
    if (g) {
      c = f;
    }
    else {
      c = $dotCall( $, undefined, undefined, c, f, 0, b );
    }
  }
  const h = c === e;
  if (h) {
    const i = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `$dotCall($array_reduceRight,\\narr,\\n`reduceRight`,\\n$);`" );
    throw i;
  }
  else {
    return undefined;
  }
};
a();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.reduceRight;
  $dotCall(tmpMCF, arr, `reduceRight`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, 1, [1, 2, 3]
 - 2: 3, 1, 0, [1, 2, 3]
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
