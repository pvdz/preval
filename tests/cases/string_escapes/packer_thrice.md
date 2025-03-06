# Preval test case

# packer_thrice.md

> String escapes > Packer thrice

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('bo\`\'\"o')` after Dean's PACKER minifier.
It is packed three times (output becomes input)

## Options

- unroll 50

## Input

`````js filename=intro
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!\'\'.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t\'\\\\w+\'};c=1};x(c--)u(k[c])p=p.v(A B(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);t p}(\'f(5(p,a,c,k,e,r){e=7;8(!\\\'\\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\\'\\\\\\\\h+\\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);6 p}(\\\'0.1(\\\\\\\'2\\\\\\\\`\\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\\')\\\',4,4,\\\'l|m|n|o\\\'.q(\\\'|\\\'),0,{}))\',C,C,\'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|\'.D(\'|\'),0,{}))',45,45,'||||||||||||||||||||||||||||function|return|if|replace||while|eval|String|new|RegExp|28|split|toString|console|log|bo|x20o'.split('|'),0,{}))
`````

## Pre Normal


`````js filename=intro
eval(
  (function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let p = $$0;
    let a = $$1;
    let c = $$2;
    let k = $$3;
    let e = $$4;
    let r = $$5;
    debugger;
    e = function ($$0) {
      let c$1 = $$0;
      debugger;
      return (c$1 < a ? `` : e(parseInt(c$1 / a))) + ((c$1 = c$1 % a) > 35 ? String.fromCharCode(c$1 + 29) : c$1.toString(36));
    };
    if (!``.replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function ($$0) {
          let e$1 = $$0;
          debugger;
          return r[e$1];
        },
      ];
      e = function () {
        debugger;
        return `\\w+`;
      };
      c = 1;
    }
    while (c--) if (k[c]) p = p.replace(new RegExp(`\\b` + e(c) + `\\b`, `g`), k[c]);
    return p;
  })(
    `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
    45,
    45,
    `||||||||||||||||||||||||||||function|return|if|replace||while|eval|String|new|RegExp|28|split|toString|console|log|bo|x20o`.split(`|`),
    0,
    {},
  ),
);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = function ($$0, $$1, $$2, $$3, $$4, $$5) {
  let p = $$0;
  let a = $$1;
  let c = $$2;
  let k = $$3;
  let e = $$4;
  let r = $$5;
  debugger;
  e = function ($$0) {
    let c$1 = $$0;
    debugger;
    let tmpBinBothLhs = undefined;
    const tmpIfTest = c$1 < a;
    if (tmpIfTest) {
      tmpBinBothLhs = ``;
    } else {
      const tmpCallCallee$1 = e;
      const tmpCalleeParam$7 = c$1 / a;
      const tmpCalleeParam$5 = parseInt(tmpCalleeParam$7);
      tmpBinBothLhs = tmpCallCallee$1(tmpCalleeParam$5);
    }
    let tmpBinBothRhs = undefined;
    c$1 = c$1 % a;
    let tmpBinLhs = c$1;
    const tmpIfTest$1 = tmpBinLhs > 35;
    if (tmpIfTest$1) {
      const tmpCalleeParam$9 = c$1 + 29;
      tmpBinBothRhs = $String_fromCharCode(tmpCalleeParam$9);
    } else {
      tmpBinBothRhs = c$1.toString(36);
    }
    const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
    return tmpReturnArg;
  };
  const tmpCalleeParam$11 = /^/;
  const tmpCalleeParam$13 = String;
  const tmpIfTest$3 = ``.replace(tmpCalleeParam$11, tmpCalleeParam$13);
  if (tmpIfTest$3) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = c;
      c = c - 1;
      const tmpIfTest$5 = tmpPostUpdArgIdent;
      if (tmpIfTest$5) {
        const tmpAssignComMemLhsObj = r;
        const tmpAssignComMemLhsProp = e(c);
        const tmpAssignComputedObj = tmpAssignComMemLhsObj;
        const tmpAssignComputedProp = tmpAssignComMemLhsProp;
        let tmpAssignComputedRhs = k[c];
        if (tmpAssignComputedRhs) {
        } else {
          tmpAssignComputedRhs = e(c);
        }
        tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      } else {
        break;
      }
    }
    const tmpArrElement = function ($$0) {
      let e$1 = $$0;
      debugger;
      const tmpReturnArg$1 = r[e$1];
      return tmpReturnArg$1;
    };
    k = [tmpArrElement];
    e = function () {
      debugger;
      return `\\w+`;
    };
    c = 1;
  }
  while (true) {
    const tmpPostUpdArgIdent$1 = c;
    c = c - 1;
    const tmpIfTest$7 = tmpPostUpdArgIdent$1;
    if (tmpIfTest$7) {
      const tmpIfTest$9 = k[c];
      if (tmpIfTest$9) {
        const tmpCallObj = p;
        const tmpCallVal = tmpCallObj.replace;
        const tmpNewCallee = RegExp;
        const tmpBinBothLhs$1 = `\\b`;
        const tmpBinBothRhs$1 = e(c);
        const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
        const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
        const tmpCalleeParam$19 = `${tmpStringConcatR}\\b`;
        const tmpCalleeParam$15 = new tmpNewCallee(tmpCalleeParam$19, `g`);
        const tmpCalleeParam$17 = k[c];
        p = $dotCall(tmpCallVal, tmpCallObj, `replace`, tmpCalleeParam$15, tmpCalleeParam$17);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCalleeParam$1 = `||||||||||||||||||||||||||||function|return|if|replace||while|eval|String|new|RegExp|28|split|toString|console|log|bo|x20o`.split(
  `|`,
);
const tmpCalleeParam$3 = {};
const tmpCalleeParam = tmpCallCallee(
  `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
  45,
  45,
  tmpCalleeParam$1,
  0,
  tmpCalleeParam$3,
);
eval(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const c$1 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$7 /*:number*/ = c$1 / 45;
  const tmpRet /*:number*/ = parseInt(tmpCalleeParam$7);
  return tmpRet;
};
const tmpCalleeParam$3 /*:object*/ = {};
let tmpSSA_e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 45;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$5 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = tmpSSA_e(tmpCalleeParam$5);
  }
  const tmpClusterSSA_c$1 /*:number*/ = c$2 % 45;
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_c$1 > 35;
  if (tmpIfTest$1) {
    const tmpCalleeParam$9 /*:number*/ = tmpClusterSSA_c$1 + 29;
    const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $String_fromCharCode(tmpCalleeParam$9);
    const tmpClusterSSA_tmpReturnArg /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = tmpClusterSSA_c$1.toString(36);
    const tmpClusterSSA_tmpReturnArg$1 /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs$1;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp /*:unknown*/ = tmpSSA_e(44);
tmpCalleeParam$3[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = tmpSSA_e(43);
tmpCalleeParam$3[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = tmpSSA_e(42);
tmpCalleeParam$3[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = tmpSSA_e(41);
tmpCalleeParam$3[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = tmpSSA_e(40);
tmpCalleeParam$3[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = tmpSSA_e(39);
tmpCalleeParam$3[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = tmpSSA_e(38);
tmpCalleeParam$3[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = tmpSSA_e(37);
tmpCalleeParam$3[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = tmpSSA_e(36);
tmpCalleeParam$3[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = tmpSSA_e(35);
tmpCalleeParam$3[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 /*:number*/ = 34;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = tmpSSA_e(34);
tmpCalleeParam$3[tmpAssignComMemLhsProp$10] = `eval`;
const tmpCalleeParam$1 /*:array*/ = [
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  `function`,
  `return`,
  `if`,
  `replace`,
  ``,
  `while`,
  `eval`,
  `String`,
  `new`,
  `RegExp`,
  `28`,
  `split`,
  `toString`,
  `console`,
  `log`,
  `bo`,
  `x20o`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 /*:unknown*/ = tmpSSA_e(tmpClusterSSA_c$2);
    let tmpAssignComputedRhs$1 /*:unknown*/ = tmpCalleeParam$1[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$2);
    }
    tmpCalleeParam$3[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = tmpCalleeParam$3[e$1];
  return tmpReturnArg$1;
};
tmpSSA_e = function () {
  debugger;
  return `\\w+`;
};
const tmpCalleeParam$15 /*:regex*/ = /\b\w+\b/g;
const tmpClusterSSA_p /*:string*/ = `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`.replace(
  tmpCalleeParam$15,
  tmpArrElement,
);
eval(tmpClusterSSA_p);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c / 45;
  const e = parseInt( d );
  return e;
};
const f = {};
let g = function($$0 ) {
  const h = $$0;
  debugger;
  let i = "";
  const j = h < 45;
  if (j) {

  }
  else {
    const k = l( a, h );
    i = g( k );
  }
  const m = h % 45;
  const n = m > 35;
  if (n) {
    const o = m + 29;
    const p = $String_fromCharCode( o );
    const q = i + p;
    return q;
  }
  else {
    const r = m.toString( 36 );
    const s = i + r;
    return s;
  }
};
const t = g( 44 );
f[t] = "x20o";
const u = g( 43 );
f[u] = "bo";
const v = g( 42 );
f[v] = "log";
const w = g( 41 );
f[w] = "console";
const x = g( 40 );
f[x] = "toString";
const y = g( 39 );
f[y] = "split";
const z = g( 38 );
f[z] = "28";
const ba = g( 37 );
f[ba] = "RegExp";
const bb = g( 36 );
f[bb] = "new";
const bc = g( 35 );
f[bc] = "String";
let bd = 34;
const be = g( 34 );
f[be] = "eval";
const bf = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "return", "if", "replace", "", "while", "eval", "String", "new", "RegExp", "28", "split", "toString", "console", "log", "bo", "x20o" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const bg = bd;
  bd = bd - 1;
  if (bg) {
    const bh = g( bd );
    let bi = bf[ bd ];
    if (bi) {

    }
    else {
      bi = g( bd );
    }
    f[bh] = bi;
  }
  else {
    break;
  }
}
const bj = function($$0 ) {
  const bk = $$0;
  debugger;
  const bl = f[ bk ];
  return bl;
};
g = function() {
  debugger;
  return "\\w+";
};
const bm = /\b\w+\b/g;
const bn = "y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))".replace( bm, bj );
eval( bn );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- objects in isFree check