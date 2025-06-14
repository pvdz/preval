# Preval test case

# reduce_elided_start.md

> Array methods > Reduceright > Reduce elided start
>
> When the array has elided elements the init value should be the first non-elided element.

## Input

`````js filename=intro
let result = [];
const x = [,,,1,2,3].reduceRight(function(x) { result.push(this === undefined); });
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
const tmpMCOO /*:array*/ /*truthy*/ = [, , , 1, 2, 3];
let tmpSSA_tmpArreout$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 3, 2, 4, tmpMCOO);
const tmpArrin$2 /*:boolean*/ = 3 in tmpMCOO;
const tmpArre1st /*:object*/ /*truthy*/ = {};
if (tmpArrin$2) {
  const tmpArrel$2 /*:primitive*/ = tmpMCOO[3];
  const tmpArrebad$2 /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
  if (tmpArrebad$2) {
    tmpSSA_tmpArreout$1 = tmpArrel$2;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$2, 3, tmpMCOO);
  }
} else {
}
const tmpArrin$1 /*:boolean*/ = 2 in tmpMCOO;
if (tmpArrin$1) {
  const tmpArrel$1 /*:primitive*/ = tmpMCOO[2];
  const tmpArrebad$1 /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
  if (tmpArrebad$1) {
    tmpSSA_tmpArreout$1 = tmpArrel$1;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$1, 2, tmpMCOO);
  }
} else {
}
const tmpArrin$3 /*:boolean*/ = 1 in tmpMCOO;
if (tmpArrin$3) {
  const tmpArrel$3 /*:primitive*/ = tmpMCOO[1];
  const tmpArrebad$3 /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
  if (tmpArrebad$3) {
    tmpSSA_tmpArreout$1 = tmpArrel$3;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$3, 1, tmpMCOO);
  }
} else {
}
const tmpArrin$4 /*:boolean*/ = 0 in tmpMCOO;
if (tmpArrin$4) {
  const tmpArrel$4 /*:primitive*/ = tmpMCOO[0];
  const tmpArrebad$4 /*:boolean*/ = tmpSSA_tmpArreout$1 === tmpArre1st;
  if (tmpArrebad$4) {
    tmpSSA_tmpArreout$1 = tmpArrel$4;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$4, 0, tmpMCOO);
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
const tmpMCOO = [, , , 1, 2, 3];
let tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, 3, 2, 4, tmpMCOO);
const tmpArrin$2 = 3 in tmpMCOO;
const tmpArre1st = {};
if (tmpArrin$2) {
  const tmpArrel$2 = tmpMCOO[3];
  if (tmpSSA_tmpArreout$1 === tmpArre1st) {
    tmpSSA_tmpArreout$1 = tmpArrel$2;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$2, 3, tmpMCOO);
  }
}
if (2 in tmpMCOO) {
  const tmpArrel$1 = tmpMCOO[2];
  if (tmpSSA_tmpArreout$1 === tmpArre1st) {
    tmpSSA_tmpArreout$1 = tmpArrel$1;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$1, 2, tmpMCOO);
  }
}
if (1 in tmpMCOO) {
  const tmpArrel$3 = tmpMCOO[1];
  if (tmpSSA_tmpArreout$1 === tmpArre1st) {
    tmpSSA_tmpArreout$1 = tmpArrel$3;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$3, 1, tmpMCOO);
  }
}
if (0 in tmpMCOO) {
  const tmpArrel$4 = tmpMCOO[0];
  if (tmpSSA_tmpArreout$1 === tmpArre1st) {
    tmpSSA_tmpArreout$1 = tmpArrel$4;
  } else {
    tmpSSA_tmpArreout$1 = $dotCall(tmpMCP, undefined, undefined, tmpSSA_tmpArreout$1, tmpArrel$4, 0, tmpMCOO);
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
const e = [ ,, ,, ,, 1, 2, 3 ];
let f = $dotCall( b, undefined, undefined, 3, 2, 4, e );
const g = 3 in e;
const h = {};
if (g) {
  const i = e[ 3 ];
  const j = f === h;
  if (j) {
    f = i;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, i, 3, e );
  }
}
const k = 2 in e;
if (k) {
  const l = e[ 2 ];
  const m = f === h;
  if (m) {
    f = l;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, l, 2, e );
  }
}
const n = 1 in e;
if (n) {
  const o = e[ 1 ];
  const p = f === h;
  if (p) {
    f = o;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, o, 1, e );
  }
}
const q = 0 in e;
if (q) {
  const r = e[ 0 ];
  const s = f === h;
  if (s) {
    f = r;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, r, 0, e );
  }
}
const t = f === h;
if (t) {
  const u = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduceRight,\\ntmpMCOO,\\n`reduceRight`,\\ntmpMCP);`" );
  throw u;
}
else {
  $( a, f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , 1, 2, 3];
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
