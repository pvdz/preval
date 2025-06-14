# Preval test case

# reduceright_without_context.md

> Array methods > Reduceright > Ai > Reduceright without context
>
> Test: Array.reduceRight without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].reduceRight(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
let tmpSSA_tmpArreout$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 3, 2, 1, tmpMCOO);
const tmpArrin$2 /*:boolean*/ = 0 in tmpMCOO;
const tmpArre1st /*:object*/ /*truthy*/ = {};
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[0];
  const tmpArrebad$2 /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
  if (tmpArrebad$2) {
    tmpSSA_tmpArreout$1 = tmpArrel$2;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$2, 0, tmpMCOO);
  }
} else {
}
const tmpArrette /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
if (tmpArrette) {
  const tmpArreerr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
  );
  throw tmpArreerr;
} else {
  $(result, tmpSSA_tmpArreout$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
let tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, 3, 2, 1, tmpMCOO);
const tmpArrin$2 = 0 in tmpMCOO;
const tmpArre1st = {};
if (tmpArrin$2) {
  const tmpArrel$2 = tmpMCOO[0];
  if (tmpSSA_tmpArreout$1 === tmpArre1st) {
    tmpSSA_tmpArreout$1 = tmpArrel$2;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$2, 0, tmpMCOO);
  }
}
if (tmpSSA_tmpArreout$1 === tmpArre1st) {
  const tmpArreerr = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
  );
  throw tmpArreerr;
} else {
  $(result, tmpSSA_tmpArreout$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
let f = $dotCall( b, undefined, undefined, 3, 2, 1, e );
const g = 0 in e;
const h = {};
if (g) {
  const i = e[ 0 ];
  const j = f === h;
  if (j) {
    f = i;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, i, 0, e );
  }
}
const k = f === h;
if (k) {
  const l = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduceRight,\\ntmpMCOO,\\n`reduceRight`,\\ntmpMCP);`" );
  throw l;
}
else {
  $( a, f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
