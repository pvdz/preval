# Preval test case

# reduceright_non_array_object.md

> Array methods > Reduceright > Ai > Reduceright non array object
>
> Test: Array.reduceRight on array-like object

## Input

`````js filename=intro
const x = Array.prototype.reduceRight.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
let tmpLambdaReduceRightOut /*:unknown*/ = tmpLambdaReduceRight1st;
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaReduceRightHas /*:boolean*/ = 1 in tmpMCP;
if (tmpLambdaReduceRightHas) {
  tmpLambdaReduceRightOut = tmpMCP[1];
} else {
}
const tmpLambdaReduceRightHas$1 /*:boolean*/ = 0 in tmpMCP;
if (tmpLambdaReduceRightHas$1) {
  const tmpLambdaReduceRightVal$1 /*:unknown*/ = tmpMCP[0];
  const tmpLambdaReduceRightBad$1 /*:boolean*/ = tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
  if (tmpLambdaReduceRightBad$1) {
    tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$1;
  } else {
    $(tmpLambdaReduceRightOut);
    tmpLambdaReduceRightOut = undefined;
  }
} else {
}
const tmpLambdaReduceRightTTE /*:boolean*/ = tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
if (tmpLambdaReduceRightTTE) {
  const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCP,\\nundefined,\\ntmpMCP\$1);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(tmpLambdaReduceRightOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpLambdaReduceRight1st = {};
let tmpLambdaReduceRightOut = tmpLambdaReduceRight1st;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
if (1 in tmpMCP) {
  tmpLambdaReduceRightOut = tmpMCP[1];
}
if (0 in tmpMCP) {
  const tmpLambdaReduceRightVal$1 = tmpMCP[0];
  if (tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
    tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$1;
  } else {
    $(tmpLambdaReduceRightOut);
    tmpLambdaReduceRightOut = undefined;
  }
}
if (tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
  const tmpLambdaReduceRightErr = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCP,\\nundefined,\\ntmpMCP\$1);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(tmpLambdaReduceRightOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
let b = a;
const c = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const d = 1 in c;
if (d) {
  b = c[ 1 ];
}
const e = 0 in c;
if (e) {
  const f = c[ 0 ];
  const g = b === a;
  if (g) {
    b = f;
  }
  else {
    $( b );
    b = undefined;
  }
}
const h = b === a;
if (h) {
  const i = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduceRight,\\ntmpMCP,\\nundefined,\\ntmpMCP$1);`" );
  throw i;
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.reduceRight;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpMCP$1 = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
$(x);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
