# Preval test case

# expr.md

> Array methods > Reduce > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.reduce($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  let tmpSSA_tmpClusterSSA_tmpArreout /*:unknown*/ = $dotCall($, undefined, undefined, 1, 2, 1, arr);
  const tmpArrin$2 /*:boolean*/ = 2 in arr;
  const tmpArre1st /*:object*/ /*truthy*/ = {};
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = arr[2];
    const tmpArrebad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st;
    if (tmpArrebad$2) {
      tmpSSA_tmpClusterSSA_tmpArreout = tmpArrel$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, tmpSSA_tmpClusterSSA_tmpArreout, tmpArrel$2, 2, arr);
    }
  } else {
  }
  const tmpArrette /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st;
  if (tmpArrette) {
    const tmpArreerr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`\$dotCall(\$array_reduce,\\narr,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpArreerr;
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
  let tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, 1, 2, 1, arr);
  const tmpArrin$2 = 2 in arr;
  const tmpArre1st = {};
  if (tmpArrin$2) {
    const tmpArrel$2 = arr[2];
    if (tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st) {
      tmpSSA_tmpClusterSSA_tmpArreout = tmpArrel$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, tmpSSA_tmpClusterSSA_tmpArreout, tmpArrel$2, 2, arr);
    }
  }
  if (tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st) {
    const tmpArreerr = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`\$dotCall(\$array_reduce,\\narr,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpArreerr;
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
    const i = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `$dotCall($array_reduce,\\narr,\\n`reduce`,\\n$);`" );
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
  const tmpMCF = arr.reduce;
  $dotCall(tmpMCF, arr, `reduce`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2, 1, [1, 2, 3]
 - 2: 1, 3, 2, [1, 2, 3]
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
