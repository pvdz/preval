# Preval test case

# reduce_some_non_array_object.md

> Array methods > Reduce > Ai > Reduce some non array object
>
> Test: Array.reduce on array-like object

## Input

`````js filename=intro
const x = Array.prototype.reduce.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpLambdaReduce1st /*:object*/ /*truthy*/ = {};
let tmpLambdaReduceOut /*:unknown*/ = tmpLambdaReduce1st;
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaReduceHas /*:boolean*/ = 0 in tmpMCP;
if (tmpLambdaReduceHas) {
  tmpLambdaReduceOut = tmpMCP[0];
} else {
}
const tmpLambdaReduceHas$1 /*:boolean*/ = 1 in tmpMCP;
if (tmpLambdaReduceHas$1) {
  const tmpLambdaReduceVal$1 /*:unknown*/ = tmpMCP[1];
  const tmpLambdaReduceBad$1 /*:boolean*/ = tmpLambdaReduceOut === tmpLambdaReduce1st;
  if (tmpLambdaReduceBad$1) {
    tmpLambdaReduceOut = tmpLambdaReduceVal$1;
  } else {
    $(tmpLambdaReduceOut);
    tmpLambdaReduceOut = undefined;
  }
} else {
}
const tmpLambdaReduceTTE /*:boolean*/ = tmpLambdaReduceOut === tmpLambdaReduce1st;
if (tmpLambdaReduceTTE) {
  const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCP,\\nundefined,\\ntmpMCP\$1);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(tmpLambdaReduceOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpLambdaReduce1st = {};
let tmpLambdaReduceOut = tmpLambdaReduce1st;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
if (0 in tmpMCP) {
  tmpLambdaReduceOut = tmpMCP[0];
}
if (1 in tmpMCP) {
  const tmpLambdaReduceVal$1 = tmpMCP[1];
  if (tmpLambdaReduceOut === tmpLambdaReduce1st) {
    tmpLambdaReduceOut = tmpLambdaReduceVal$1;
  } else {
    $(tmpLambdaReduceOut);
    tmpLambdaReduceOut = undefined;
  }
}
if (tmpLambdaReduceOut === tmpLambdaReduce1st) {
  const tmpLambdaReduceErr = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCP,\\nundefined,\\ntmpMCP\$1);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(tmpLambdaReduceOut);
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
const d = 0 in c;
if (d) {
  b = c[ 0 ];
}
const e = 1 in c;
if (e) {
  const f = c[ 1 ];
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
  const i = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduce,\\ntmpMCP,\\nundefined,\\ntmpMCP$1);`" );
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
const tmpMCOO = tmpCompObj.reduce;
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
 - 1: 'a'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
