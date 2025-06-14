# Preval test case

# assigned.md

> Array methods > Reduce > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].reduce($);
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
  let tmpSSA_tmpClusterSSA_tmpArreout /*:unknown*/ = $dotCall($, undefined, undefined, 1, 2, 1, tmpMCOO);
  const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
  const tmpArre1st /*:object*/ /*truthy*/ = {};
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
    const tmpArrebad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st;
    if (tmpArrebad$2) {
      tmpSSA_tmpClusterSSA_tmpArreout = tmpArrel$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, tmpSSA_tmpClusterSSA_tmpArreout, tmpArrel$2, 2, tmpMCOO);
    }
  } else {
  }
  const tmpArrette /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st;
  if (tmpArrette) {
    const tmpArreerr /*:object*/ /*truthy*/ = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`x\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpArreerr;
  } else {
    x = tmpSSA_tmpClusterSSA_tmpArreout;
    $(tmpSSA_tmpClusterSSA_tmpArreout);
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
  let tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, 1, 2, 1, tmpMCOO);
  const tmpArrin$2 = 2 in tmpMCOO;
  const tmpArre1st = {};
  if (tmpArrin$2) {
    const tmpArrel$2 = tmpMCOO[2];
    if (tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st) {
      tmpSSA_tmpClusterSSA_tmpArreout = tmpArrel$2;
    } else {
      tmpSSA_tmpClusterSSA_tmpArreout = $dotCall($, undefined, undefined, tmpSSA_tmpClusterSSA_tmpArreout, tmpArrel$2, 2, tmpMCOO);
    }
  }
  if (tmpSSA_tmpClusterSSA_tmpArreout === tmpArre1st) {
    const tmpArreerr = new $typeError_constructor(
      `[Preval] Called .reduce without init on an array without values: \`x\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\n\$);\``,
    );
    throw tmpArreerr;
  } else {
    x = tmpSSA_tmpClusterSSA_tmpArreout;
    $(tmpSSA_tmpClusterSSA_tmpArreout);
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
    const i = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `x\\n=\\n$dotCall($array_reduce,\\ntmpMCOO,\\n`reduce`,\\n$);`" );
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
  const tmpMCF = tmpMCOO.reduce;
  x = $dotCall(tmpMCF, tmpMCOO, `reduce`, $);
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
 - 3: 1
 - 4: '<function>'
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
