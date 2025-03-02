# Preval test case

# packer_halp3.md

> String escapes > Packer halp3
>
> This is the following code packed with Dean's packer (https://richosoft2.co.uk/resources/jspack/)
> 
> ```
> "a\`b\"c\'d\\e\x20f\u0020g${not_expr}h\/i"
> ```
> 
> Encoded thrice. Output is encoded again, and then once again.
> (Note; eval can't access $ so we can't use $ here unfortunately)

## Input

`````js filename=intro
const x = eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!\'\'.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B\'\\\\w+\'};c=1};E(c--)C(k[c])p=p.D(H I(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);B p}(\'s(f(p,a,c,k,e,r){e=l;m(!\\\'\\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\\'\\\\\\\\w+\\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);j p}(\\\'"0\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6${7}8\\\\\\\\/9"\\\',q,q,\\\'a|b|c|d|e|v|x|y|h|i\\\'.z(\\\'|\\\'),0,{}))\',J,J,\'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K\'.K(\'|\'),0,{}))',52,52,'||||||||||||||||||||||||||||||||||||function|return|if|replace|while|eval|String|new|RegExp|36|split|toString|10|x20f|u0020g|not_expr'.split('|'),0,{}));
$(x);
`````

## Pre Normal


`````js filename=intro
const x = eval(
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
    `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`,
    52,
    52,
    `||||||||||||||||||||||||||||||||||||function|return|if|replace|while|eval|String|new|RegExp|36|split|toString|10|x20f|u0020g|not_expr`.split(
      `|`,
    ),
    0,
    {},
  ),
);
$(x);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = eval;
const tmpCallCallee$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
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
      const tmpCallCallee$3 = e;
      const tmpCallCallee$5 = parseInt;
      const tmpCalleeParam$15 = c$1 / a;
      const tmpCalleeParam$13 = tmpCallCallee$5(tmpCalleeParam$15);
      tmpBinBothLhs = tmpCallCallee$3(tmpCalleeParam$13);
    }
    let tmpBinBothRhs = undefined;
    c$1 = c$1 % a;
    let tmpBinLhs = c$1;
    const tmpIfTest$1 = tmpBinLhs > 35;
    if (tmpIfTest$1) {
      const tmpCalleeParam$17 = c$1 + 29;
      tmpBinBothRhs = $String_fromCharCode(tmpCalleeParam$17);
    } else {
      tmpBinBothRhs = c$1.toString(36);
    }
    const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
    return tmpReturnArg;
  };
  const tmpCalleeParam$19 = /^/;
  const tmpCalleeParam$21 = String;
  const tmpIfTest$3 = ``.replace(tmpCalleeParam$19, tmpCalleeParam$21);
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
        const tmpCalleeParam$27 = `${tmpStringConcatR}\\b`;
        const tmpCalleeParam$29 = `g`;
        const tmpCalleeParam$23 = new tmpNewCallee(tmpCalleeParam$27, tmpCalleeParam$29);
        const tmpCalleeParam$25 = k[c];
        p = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$23, tmpCalleeParam$25);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCalleeParam$1 = `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`;
const tmpCalleeParam$3 = 52;
const tmpCalleeParam$5 = 52;
const tmpCalleeParam$7 = `||||||||||||||||||||||||||||||||||||function|return|if|replace|while|eval|String|new|RegExp|36|split|toString|10|x20f|u0020g|not_expr`.split(
  `|`,
);
const tmpCalleeParam$9 = 0;
const tmpCalleeParam$11 = {};
const tmpCalleeParam = tmpCallCallee$1(
  tmpCalleeParam$1,
  tmpCalleeParam$3,
  tmpCalleeParam$5,
  tmpCalleeParam$7,
  tmpCalleeParam$9,
  tmpCalleeParam$11,
);
const x = tmpCallCallee(tmpCalleeParam);
$(x);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const c$1 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$15 /*:number*/ = c$1 / 52;
  const tmpRet /*:number*/ = parseInt(tmpCalleeParam$15);
  return tmpRet;
};
const tmpCalleeParam$11 /*:object*/ = {};
let tmpSSA_e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 52;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$13 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = tmpSSA_e(tmpCalleeParam$13);
  }
  const tmpClusterSSA_c$1 /*:number*/ = c$2 % 52;
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_c$1 > 35;
  if (tmpIfTest$1) {
    const tmpCalleeParam$17 /*:number*/ = tmpClusterSSA_c$1 + 29;
    const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $String_fromCharCode(tmpCalleeParam$17);
    const tmpClusterSSA_tmpReturnArg /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = tmpClusterSSA_c$1.toString(36);
    const tmpClusterSSA_tmpReturnArg$1 /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs$1;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp /*:unknown*/ = tmpSSA_e(51);
tmpCalleeParam$11[tmpAssignComMemLhsProp] = `not_expr`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = tmpSSA_e(50);
tmpCalleeParam$11[tmpAssignComMemLhsProp$1] = `u0020g`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = tmpSSA_e(49);
tmpCalleeParam$11[tmpAssignComMemLhsProp$2] = `x20f`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = tmpSSA_e(48);
tmpCalleeParam$11[tmpAssignComMemLhsProp$3] = `10`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = tmpSSA_e(47);
tmpCalleeParam$11[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = tmpSSA_e(46);
tmpCalleeParam$11[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = tmpSSA_e(45);
tmpCalleeParam$11[tmpAssignComMemLhsProp$6] = `36`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = tmpSSA_e(44);
tmpCalleeParam$11[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = tmpSSA_e(43);
tmpCalleeParam$11[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = tmpSSA_e(42);
tmpCalleeParam$11[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 /*:number*/ = 41;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = tmpSSA_e(41);
tmpCalleeParam$11[tmpAssignComMemLhsProp$10] = `eval`;
const tmpCalleeParam$7 /*:array*/ = [
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
  `while`,
  `eval`,
  `String`,
  `new`,
  `RegExp`,
  `36`,
  `split`,
  `toString`,
  `10`,
  `x20f`,
  `u0020g`,
  `not_expr`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 /*:unknown*/ = tmpSSA_e(tmpClusterSSA_c$2);
    let tmpAssignComputedRhs$1 /*:unknown*/ = tmpCalleeParam$7[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$2);
    }
    tmpCalleeParam$11[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = tmpCalleeParam$11[e$1];
  return tmpReturnArg$1;
};
tmpSSA_e = function () {
  debugger;
  return `\\w+`;
};
const tmpCalleeParam$23 /*:regex*/ = /\b\w+\b/g;
const tmpClusterSSA_p /*:string*/ = `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`.replace(
  tmpCalleeParam$23,
  tmpArrElement,
);
const x /*:unknown*/ = eval(tmpClusterSSA_p);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c / 52;
  const e = parseInt( d );
  return e;
};
const f = {};
let g = function($$0 ) {
  const h = $$0;
  debugger;
  let i = "";
  const j = h < 52;
  if (j) {

  }
  else {
    const k = l( a, h );
    i = g( k );
  }
  const m = h % 52;
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
const t = g( 51 );
f[t] = "not_expr";
const u = g( 50 );
f[u] = "u0020g";
const v = g( 49 );
f[v] = "x20f";
const w = g( 48 );
f[w] = "10";
const x = g( 47 );
f[x] = "toString";
const y = g( 46 );
f[y] = "split";
const z = g( 45 );
f[z] = "36";
const ba = g( 44 );
f[ba] = "RegExp";
const bb = g( 43 );
f[bb] = "new";
const bc = g( 42 );
f[bc] = "String";
let bd = 41;
const be = g( 41 );
f[be] = "eval";
const bf = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "return", "if", "replace", "while", "eval", "String", "new", "RegExp", "36", "split", "toString", "10", "x20f", "u0020g", "not_expr" ];
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
const bn = "F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'\"0\\\\\\\\`1\\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6${7}8\\\\\\\\/9\"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))".replace( bm, bj );
const bo = eval( bn );
$( bo );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a`b"c\'d\\e f g${not_expr}h/i'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
