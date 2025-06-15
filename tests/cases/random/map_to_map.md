# Preval test case

# map_to_map.md

> Random > Map to map
>
> Defining a map with primitives that is immediately converted to another map

More of a concept that should be possible to be folded. This is very close to actual code used in Preval :p

## Input

`````js filename=intro
$(
  new Map(
    [
      ...new Map([
        ['clearInterval', 'global.clearInterval'],
        ['clearTimeout', 'global.clearTimeout'],
        ['console', 'global.console'],
        ['false', 'boolean'],
        ['null', 'null'],
        ['$', '$'],
      ]).keys(),
      'module',
    ].map((k) => [k, k]),
  ).get('$'),
);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:array*/ /*truthy*/ = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 /*:array*/ /*truthy*/ = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 /*:array*/ /*truthy*/ = [`console`, `global.console`];
const tmpArrElement$5 /*:array*/ /*truthy*/ = [`false`, `boolean`];
const tmpArrElement$7 /*:array*/ /*truthy*/ = [`null`, `null`];
const tmpArrElement$9 /*:array*/ /*truthy*/ = [`\$`, `\$`];
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
];
const tmpMCOO$3 /*:map*/ /*truthy*/ = new $map_constructor(tmpCalleeParam$3);
const tmpArrSpread /*:iterator*/ /*truthy*/ = $dotCall($map_keys, tmpMCOO$3, `keys`);
const tmpMCOO$1 /*:array*/ /*truthy*/ = [...tmpArrSpread, `module`];
const tmpArrlen /*:number*/ = tmpMCOO$1.length;
const tmpArrc /*:boolean*/ = 0 < tmpArrlen;
const tmpArreout /*:array*/ /*truthy*/ = [];
if (tmpArrc) {
  const tmpArrin /*:boolean*/ = 0 in tmpMCOO$1;
  if (tmpArrin) {
    const tmpArrel /*:unknown*/ = tmpMCOO$1[0];
    const tmpClusterSSA_tmpArrenow /*:array*/ /*truthy*/ = [tmpArrel, tmpArrel];
    tmpArreout[0] = tmpClusterSSA_tmpArrenow;
  } else {
  }
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < tmpArrlen;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in tmpMCOO$1;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:unknown*/ = tmpMCOO$1[tmpClusterSSA_tmpArri];
        const tmpClusterSSA_tmpArrenow$1 /*:array*/ /*truthy*/ = [tmpArrel$1, tmpArrel$1];
        tmpArreout[tmpClusterSSA_tmpArri] = tmpClusterSSA_tmpArrenow$1;
      } else {
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
} else {
}
tmpArreout.length = tmpArrlen;
const tmpMCOO /*:map*/ /*truthy*/ = new $map_constructor(tmpArreout);
const tmpCalleeParam /*:unknown*/ /*truthy*/ = $dotCall($map_get, tmpMCOO, `get`, `\$`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
const tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpArrSpread = $dotCall($map_keys, new $map_constructor(tmpCalleeParam$3), `keys`);
const tmpMCOO$1 = [...tmpArrSpread, `module`];
const tmpArrlen = tmpMCOO$1.length;
const tmpArrc = 0 < tmpArrlen;
const tmpArreout = [];
if (tmpArrc) {
  if (0 in tmpMCOO$1) {
    const tmpArrel = tmpMCOO$1[0];
    const tmpClusterSSA_tmpArrenow = [tmpArrel, tmpArrel];
    tmpArreout[0] = tmpClusterSSA_tmpArrenow;
  }
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < tmpArrlen) {
      if (tmpClusterSSA_tmpArri in tmpMCOO$1) {
        const tmpArrel$1 = tmpMCOO$1[tmpClusterSSA_tmpArri];
        const tmpClusterSSA_tmpArrenow$1 = [tmpArrel$1, tmpArrel$1];
        tmpArreout[tmpClusterSSA_tmpArri] = tmpClusterSSA_tmpArrenow$1;
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
}
tmpArreout.length = tmpArrlen;
$($dotCall($map_get, new $map_constructor(tmpArreout), `get`, `\$`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "clearInterval", "global.clearInterval" ];
const b = [ "clearTimeout", "global.clearTimeout" ];
const c = [ "console", "global.console" ];
const d = [ "false", "boolean" ];
const e = [ "null", "null" ];
const f = [ "$", "$" ];
const g = [ a, b, c, d, e, f ];
const h = new $map_constructor( g );
const i = $dotCall( $map_keys, h, "keys" );
const j = [ ...i, "module" ];
const k = j.length;
const l = 0 < k;
const m = [];
if (l) {
  const n = 0 in j;
  if (n) {
    const o = j[ 0 ];
    const p = [ o, o ];
    m[0] = p;
  }
  let q = 1;
  while ($LOOP_UNROLL_10) {
    const r = q < k;
    if (r) {
      const s = q in j;
      if (s) {
        const t = j[ q ];
        const u = [ t, t ];
        m[q] = u;
      }
      q = q + 1;
    }
    else {
      break;
    }
  }
}
m.length = k;
const v = new $map_constructor( m );
const w = $dotCall( $map_get, v, "get", "$" );
$( w );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Map;
const tmpNewCallee$1 = Map;
const tmpArrElement = [`clearInterval`, `global.clearInterval`];
const tmpArrElement$1 = [`clearTimeout`, `global.clearTimeout`];
const tmpArrElement$3 = [`console`, `global.console`];
const tmpArrElement$5 = [`false`, `boolean`];
const tmpArrElement$7 = [`null`, `null`];
const tmpArrElement$9 = [`\$`, `\$`];
let tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
const tmpMCOO$3 = new tmpNewCallee$1(tmpCalleeParam$3);
const tmpMCF = tmpMCOO$3.keys;
const tmpArrSpread = $dotCall(tmpMCF, tmpMCOO$3, `keys`);
const tmpMCOO$1 = [...tmpArrSpread, `module`];
const tmpMCF$1 = tmpMCOO$1.map;
const tmpMCP = function ($$0) {
  let k = $$0;
  debugger;
  const tmpReturnArg = [k, k];
  return tmpReturnArg;
};
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `map`, tmpMCP);
const tmpMCOO = new tmpNewCallee(tmpCalleeParam$1);
const tmpMCF$3 = tmpMCOO.get;
let tmpCalleeParam = $dotCall(tmpMCF$3, tmpMCOO, `get`, `\$`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_map
- (todo) access object property that also exists on prototype? $map_get
- (todo) access object property that also exists on prototype? $map_keys
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $map_get
- (todo) type trackeed tricks can possibly support static $map_keys
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
