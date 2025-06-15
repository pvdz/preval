# Preval test case

# varred.md

> Array methods > Reduceright > Varred
>
> Make sure var init does not break

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  const x = arr.reduceRight($);
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
  let tmpSSA_tmpLambdaReduceRightOut$1 /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, 1, arr);
  const tmpLambdaReduceRightHas$2 /*:boolean*/ = 0 in arr;
  const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 /*:primitive*/ = arr[0];
    const tmpLambdaReduceRightBad$2 /*:boolean*/ = tmpSSA_tmpLambdaReduceRightOut$1 === tmpLambdaReduceRight1st;
    if (tmpLambdaReduceRightBad$2) {
      tmpSSA_tmpLambdaReduceRightOut$1 = tmpLambdaReduceRightVal$2;
    } else {
      tmpSSA_tmpLambdaReduceRightOut$1 = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpLambdaReduceRightOut$1,
        tmpLambdaReduceRightVal$2,
        0,
        arr,
      );
    }
  } else {
  }
  const tmpLambdaReduceRightTTE /*:boolean*/ = tmpSSA_tmpLambdaReduceRightOut$1 === tmpLambdaReduceRight1st;
  if (tmpLambdaReduceRightTTE) {
    const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\$1\\n=\\n\$dotCall(\$array_reduceRight,\\narr,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  } else {
    $(tmpSSA_tmpLambdaReduceRightOut$1);
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
  let tmpSSA_tmpLambdaReduceRightOut$1 = $dotCall($, undefined, undefined, 3, 2, 1, arr);
  const tmpLambdaReduceRightHas$2 = 0 in arr;
  const tmpLambdaReduceRight1st = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 = arr[0];
    if (tmpSSA_tmpLambdaReduceRightOut$1 === tmpLambdaReduceRight1st) {
      tmpSSA_tmpLambdaReduceRightOut$1 = tmpLambdaReduceRightVal$2;
    } else {
      tmpSSA_tmpLambdaReduceRightOut$1 = $dotCall(
        $,
        undefined,
        undefined,
        tmpSSA_tmpLambdaReduceRightOut$1,
        tmpLambdaReduceRightVal$2,
        0,
        arr,
      );
    }
  }
  if (tmpSSA_tmpLambdaReduceRightOut$1 === tmpLambdaReduceRight1st) {
    const tmpLambdaReduceRightErr = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\$1\\n=\\n\$dotCall(\$array_reduceRight,\\narr,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  } else {
    $(tmpSSA_tmpLambdaReduceRightOut$1);
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
    const i = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx$1\\n=\\n$dotCall($array_reduceRight,\\narr,\\n`reduceRight`,\\n$);`" );
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
  const tmpMCF = arr.reduceRight;
  const x$1 = $dotCall(tmpMCF, arr, `reduceRight`, $);
  $(x$1);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, 1, [1, 2, 3]
 - 2: 3, 1, 0, [1, 2, 3]
 - 3: 3
 - 4: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
