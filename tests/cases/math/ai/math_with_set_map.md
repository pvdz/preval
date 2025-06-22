# Preval test case

# math_with_set_map.md

> Math > Ai > Math with set map
>
> Math.sqrt on Set and Map values

## Input

`````js filename=intro
const s = new Set([4, 9, 16]);
const m = new Map([[1, 25], [2, 36]]);
const arr1 = Array.from(s).map(Math.sqrt);
const arr2 = Array.from(m.values()).map(Math.sqrt);
$(arr1[0]);
$(arr1[1]);
$(arr1[2]);
$(arr2[0]);
$(arr2[1]);
// Should be 2, 3, 4, 5, 6
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [4, 9, 16];
const s /*:set*/ /*truthy*/ = new $set_constructor(tmpCalleeParam);
const tmpArrElement /*:array*/ /*truthy*/ = [1, 25];
const tmpArrElement$1 /*:array*/ /*truthy*/ = [2, 36];
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const m /*:map*/ /*truthy*/ = new $map_constructor(tmpCalleeParam$1);
const tmpMCOO /*:array*/ /*truthy*/ = $Array_from(s);
const tmpLambdaMapLen /*:number*/ = tmpMCOO.length;
const tmpLambdaMapTest /*:boolean*/ = 0 < tmpLambdaMapLen;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaMapTest) {
  const tmpLambdaMapHas /*:boolean*/ = 0 in tmpMCOO;
  if (tmpLambdaMapHas) {
    const tmpLambdaMapVal /*:unknown*/ = tmpMCOO[0];
    const tmpLambdaMapNow /*:number*/ = $Math_sqrt(tmpLambdaMapVal);
    tmpLambdaMapOut[0] = tmpLambdaMapNow;
  } else {
  }
  let tmpClusterSSA_tmpLambdaMapCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaMapTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen;
    if (tmpLambdaMapTest$1) {
      const tmpLambdaMapHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter in tmpMCOO;
      if (tmpLambdaMapHas$1) {
        const tmpLambdaMapVal$1 /*:unknown*/ = tmpMCOO[tmpClusterSSA_tmpLambdaMapCounter];
        const tmpLambdaMapNow$1 /*:number*/ = $Math_sqrt(tmpLambdaMapVal$1);
        tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
      } else {
      }
      tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
    } else {
      break;
    }
  }
} else {
}
tmpLambdaMapOut.length = tmpLambdaMapLen;
const tmpMCP$1 /*:iterator*/ /*truthy*/ = $dotCall($map_values, m, `values`);
const tmpMCOO$1 /*:array*/ /*truthy*/ = $Array_from(tmpMCP$1);
const tmpLambdaMapLen$1 /*:number*/ = tmpMCOO$1.length;
const tmpLambdaMapTest$3 /*:boolean*/ = 0 < tmpLambdaMapLen$1;
const tmpLambdaMapOut$1 /*:array*/ /*truthy*/ = [];
if (tmpLambdaMapTest$3) {
  const tmpLambdaMapHas$3 /*:boolean*/ = 0 in tmpMCOO$1;
  if (tmpLambdaMapHas$3) {
    const tmpLambdaMapVal$3 /*:unknown*/ = tmpMCOO$1[0];
    const tmpLambdaMapNow$3 /*:number*/ = $Math_sqrt(tmpLambdaMapVal$3);
    tmpLambdaMapOut$1[0] = tmpLambdaMapNow$3;
  } else {
  }
  let tmpClusterSSA_tmpLambdaMapCounter$1 /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaMapTest$2 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter$1 < tmpLambdaMapLen$1;
    if (tmpLambdaMapTest$2) {
      const tmpLambdaMapHas$2 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter$1 in tmpMCOO$1;
      if (tmpLambdaMapHas$2) {
        const tmpLambdaMapVal$2 /*:unknown*/ = tmpMCOO$1[tmpClusterSSA_tmpLambdaMapCounter$1];
        const tmpLambdaMapNow$2 /*:number*/ = $Math_sqrt(tmpLambdaMapVal$2);
        tmpLambdaMapOut$1[tmpClusterSSA_tmpLambdaMapCounter$1] = tmpLambdaMapNow$2;
      } else {
      }
      tmpClusterSSA_tmpLambdaMapCounter$1 = tmpClusterSSA_tmpLambdaMapCounter$1 + 1;
    } else {
      break;
    }
  }
} else {
}
tmpLambdaMapOut$1.length = tmpLambdaMapLen$1;
const tmpCalleeParam$3 /*:primitive*/ = tmpLambdaMapOut[0];
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:primitive*/ = tmpLambdaMapOut[1];
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:primitive*/ = tmpLambdaMapOut[2];
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:primitive*/ = tmpLambdaMapOut$1[0];
$(tmpCalleeParam$9);
const tmpCalleeParam$11 /*:primitive*/ = tmpLambdaMapOut$1[1];
$(tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = [4, 9, 16];
const s = new $set_constructor(tmpCalleeParam);
const tmpArrElement = [1, 25];
const tmpArrElement$1 = [2, 36];
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1];
const m = new $map_constructor(tmpCalleeParam$1);
const tmpMCOO = $Array_from(s);
const tmpLambdaMapLen = tmpMCOO.length;
const tmpLambdaMapTest = 0 < tmpLambdaMapLen;
const tmpLambdaMapOut = [];
if (tmpLambdaMapTest) {
  if (0 in tmpMCOO) {
    const tmpLambdaMapNow = $Math_sqrt(tmpMCOO[0]);
    tmpLambdaMapOut[0] = tmpLambdaMapNow;
  }
  let tmpClusterSSA_tmpLambdaMapCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen) {
      if (tmpClusterSSA_tmpLambdaMapCounter in tmpMCOO) {
        const tmpLambdaMapNow$1 = $Math_sqrt(tmpMCOO[tmpClusterSSA_tmpLambdaMapCounter]);
        tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
      }
      tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
    } else {
      break;
    }
  }
}
tmpLambdaMapOut.length = tmpLambdaMapLen;
const tmpMCOO$1 = $Array_from($dotCall($map_values, m, `values`));
const tmpLambdaMapLen$1 = tmpMCOO$1.length;
const tmpLambdaMapTest$3 = 0 < tmpLambdaMapLen$1;
const tmpLambdaMapOut$1 = [];
if (tmpLambdaMapTest$3) {
  if (0 in tmpMCOO$1) {
    const tmpLambdaMapNow$3 = $Math_sqrt(tmpMCOO$1[0]);
    tmpLambdaMapOut$1[0] = tmpLambdaMapNow$3;
  }
  let tmpClusterSSA_tmpLambdaMapCounter$1 = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaMapCounter$1 < tmpLambdaMapLen$1) {
      if (tmpClusterSSA_tmpLambdaMapCounter$1 in tmpMCOO$1) {
        const tmpLambdaMapNow$2 = $Math_sqrt(tmpMCOO$1[tmpClusterSSA_tmpLambdaMapCounter$1]);
        tmpLambdaMapOut$1[tmpClusterSSA_tmpLambdaMapCounter$1] = tmpLambdaMapNow$2;
      }
      tmpClusterSSA_tmpLambdaMapCounter$1 = tmpClusterSSA_tmpLambdaMapCounter$1 + 1;
    } else {
      break;
    }
  }
}
tmpLambdaMapOut$1.length = tmpLambdaMapLen$1;
$(tmpLambdaMapOut[0]);
$(tmpLambdaMapOut[1]);
$(tmpLambdaMapOut[2]);
$(tmpLambdaMapOut$1[0]);
$(tmpLambdaMapOut$1[1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 9, 16 ];
const b = new $set_constructor( a );
const c = [ 1, 25 ];
const d = [ 2, 36 ];
const e = [ c, d ];
const f = new $map_constructor( e );
const g = $Array_from( b );
const h = g.length;
const i = 0 < h;
const j = [];
if (i) {
  const k = 0 in g;
  if (k) {
    const l = g[ 0 ];
    const m = $Math_sqrt( l );
    j[0] = m;
  }
  let n = 1;
  while ($LOOP_UNROLL_10) {
    const o = n < h;
    if (o) {
      const p = n in g;
      if (p) {
        const q = g[ n ];
        const r = $Math_sqrt( q );
        j[n] = r;
      }
      n = n + 1;
    }
    else {
      break;
    }
  }
}
j.length = h;
const s = $dotCall( $map_values, f, "values" );
const t = $Array_from( s );
const u = t.length;
const v = 0 < u;
const w = [];
if (v) {
  const x = 0 in t;
  if (x) {
    const y = t[ 0 ];
    const z = $Math_sqrt( y );
    w[0] = z;
  }
  let ba = 1;
  while ($LOOP_UNROLL_10) {
    const bb = ba < u;
    if (bb) {
      const bc = ba in t;
      if (bc) {
        const bd = t[ ba ];
        const be = $Math_sqrt( bd );
        w[ba] = be;
      }
      ba = ba + 1;
    }
    else {
      break;
    }
  }
}
w.length = u;
const bf = j[ 0 ];
$( bf );
const bg = j[ 1 ];
$( bg );
const bh = j[ 2 ];
$( bh );
const bi = w[ 0 ];
$( bi );
const bj = w[ 1 ];
$( bj );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Set;
let tmpCalleeParam = [4, 9, 16];
const s = new tmpNewCallee(tmpCalleeParam);
const tmpNewCallee$1 = Map;
const tmpArrElement = [1, 25];
const tmpArrElement$1 = [2, 36];
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1];
const m = new tmpNewCallee$1(tmpCalleeParam$1);
const tmpMCF = $Array_from;
const tmpMCOO = $Array_from(s);
const tmpMCF$1 = tmpMCOO.map;
const tmpMCP = $Math_sqrt;
const arr1 = $dotCall(tmpMCF$1, tmpMCOO, `map`, $Math_sqrt);
const tmpMCF$3 = $Array_from;
const tmpMCF$5 = m.values;
const tmpMCP$1 = $dotCall(tmpMCF$5, m, `values`);
const tmpMCOO$1 = $dotCall(tmpMCF$3, $array_constructor, `from`, tmpMCP$1);
const tmpMCF$7 = tmpMCOO$1.map;
const tmpMCP$3 = $Math_sqrt;
const arr2 = $dotCall(tmpMCF$7, tmpMCOO$1, `map`, $Math_sqrt);
let tmpCalleeParam$3 = arr1[0];
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = arr1[1];
$(tmpCalleeParam$5);
let tmpCalleeParam$7 = arr1[2];
$(tmpCalleeParam$7);
let tmpCalleeParam$9 = arr2[0];
$(tmpCalleeParam$9);
let tmpCalleeParam$11 = arr2[1];
$(tmpCalleeParam$11);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_map
- (todo) access object property that also exists on prototype? $map_values
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $Math_sqrt
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $map_values


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
