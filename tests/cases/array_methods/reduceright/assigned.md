# Preval test case

# assigned.md

> Array methods > Reduceright > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].reduceRight($);
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
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, 1, tmpMCOO);
  const tmpLambdaReduceRightHas$2 /*:boolean*/ = 0 in tmpMCOO;
  const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 /*:primitive*/ = tmpMCOO[0];
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
        tmpMCOO,
      );
    }
  } else {
  }
  const tmpLambdaReduceRightTTE /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
  if (tmpLambdaReduceRightTTE) {
    const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`x\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  } else {
    x = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut;
    $(tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut);
    return undefined;
  }
};
let x /*:unknown*/ = 1;
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpMCOO = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall($, undefined, undefined, 3, 2, 1, tmpMCOO);
  const tmpLambdaReduceRightHas$2 = 0 in tmpMCOO;
  const tmpLambdaReduceRight1st = {};
  if (tmpLambdaReduceRightHas$2) {
    const tmpLambdaReduceRightVal$2 = tmpMCOO[0];
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
        tmpMCOO,
      );
    }
  }
  if (tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
    const tmpLambdaReduceRightErr = new $typeError_constructor(
      `[Preval] Called .reduceRight without init on an array without values: \`x\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\n\$);\``,
    );
    throw tmpLambdaReduceRightErr;
  } else {
    x = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut;
    $(tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut);
  }
};
let x = 1;
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
    const i = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `x\\n=\\n$dotCall($array_reduceRight,\\ntmpMCOO,\\n`reduceRight`,\\n$);`" );
    throw i;
  }
  else {
    j = c;
    $( c );
    return undefined;
  }
};
let j = 1;
a();
$( a );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = [1, 2, 3];
  const tmpMCF = tmpMCOO.reduceRight;
  x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, $);
  $(x);
  return undefined;
};
let x = 1;
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, 1, [1, 2, 3]
 - 2: 3, 1, 0, [1, 2, 3]
 - 3: 3
 - 4: '<function>'
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
