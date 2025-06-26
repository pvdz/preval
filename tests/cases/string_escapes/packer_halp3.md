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


## Settled


`````js filename=intro
const tmpFree$1 /*:(number)=>string*/ = function $free($$0) {
  const tmpClusterSSA_c$1 /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = tmpClusterSSA_c$1 + 29;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP);
  return tmpRet$1;
};
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const c$4 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:number*/ = c$4 / 52;
  const tmpRet /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  return tmpRet;
};
const r /*:object*/ /*truthy*/ = {};
let tmpSSA_e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 52;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = tmpSSA_e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$3 /*:number*/ = c$2 % 52;
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_c$3 > 35;
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $frfr(tmpFree$1, tmpClusterSSA_c$3);
    const tmpClusterSSA_tmpReturnArg /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$3, `toString`, 36);
    const tmpClusterSSA_tmpReturnArg$1 /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs$1;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp /*:unknown*/ = tmpSSA_e(51);
r[tmpAssignComMemLhsProp] = `not_expr`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = tmpSSA_e(50);
r[tmpAssignComMemLhsProp$1] = `u0020g`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = tmpSSA_e(49);
r[tmpAssignComMemLhsProp$2] = `x20f`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = tmpSSA_e(48);
r[tmpAssignComMemLhsProp$3] = `10`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = tmpSSA_e(47);
r[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = tmpSSA_e(46);
r[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = tmpSSA_e(45);
r[tmpAssignComMemLhsProp$6] = `36`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = tmpSSA_e(44);
r[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = tmpSSA_e(43);
r[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = tmpSSA_e(42);
r[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 /*:number*/ = 41;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = tmpSSA_e(41);
r[tmpAssignComMemLhsProp$10] = `eval`;
const k /*:array*/ /*truthy*/ = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
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
  const tmpPostUpdArgIdent$1 /*:number*/ = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 /*:unknown*/ = tmpSSA_e(tmpClusterSSA_c$2);
    let tmpAssignComputedRhs$1 /*:unknown*/ = k[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$2);
    }
    r[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = r[e$1];
  return tmpReturnArg$1;
};
tmpSSA_e = function () {
  debugger;
  return `\\w+`;
};
const tmpMCP$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const tmpClusterSSA_p /*:string*/ = $dotCall(
  $string_replace,
  `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`,
  `replace`,
  tmpMCP$3,
  tmpArrElement,
);
const x /*:unknown*/ = eval(tmpClusterSSA_p);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(tmpClusterSSA_c$1) {
  const tmpRet$1 = $String_fromCharCode(tmpClusterSSA_c$1 + 29);
  return tmpRet$1;
};
const tmpFree = function $free(c$4) {
  const tmpRet = $Number_parseInt(c$4 / 52);
  return tmpRet;
};
const r = {};
let tmpSSA_e = function (c$2) {
  let tmpBinBothLhs = ``;
  if (!(c$2 < 52)) {
    tmpBinBothLhs = tmpSSA_e($frfr(tmpFree, c$2));
  }
  const tmpClusterSSA_c$3 = c$2 % 52;
  if (tmpClusterSSA_c$3 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + $frfr(tmpFree$1, tmpClusterSSA_c$3);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + $dotCall($number_toString, tmpClusterSSA_c$3, `toString`, 36);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp = tmpSSA_e(51);
r[tmpAssignComMemLhsProp] = `not_expr`;
const tmpAssignComMemLhsProp$1 = tmpSSA_e(50);
r[tmpAssignComMemLhsProp$1] = `u0020g`;
const tmpAssignComMemLhsProp$2 = tmpSSA_e(49);
r[tmpAssignComMemLhsProp$2] = `x20f`;
const tmpAssignComMemLhsProp$3 = tmpSSA_e(48);
r[tmpAssignComMemLhsProp$3] = `10`;
const tmpAssignComMemLhsProp$4 = tmpSSA_e(47);
r[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 = tmpSSA_e(46);
r[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 = tmpSSA_e(45);
r[tmpAssignComMemLhsProp$6] = `36`;
const tmpAssignComMemLhsProp$7 = tmpSSA_e(44);
r[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 = tmpSSA_e(43);
r[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 = tmpSSA_e(42);
r[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 = 41;
const tmpAssignComMemLhsProp$10 = tmpSSA_e(41);
r[tmpAssignComMemLhsProp$10] = `eval`;
const k = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
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
while (true) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 = tmpSSA_e(tmpClusterSSA_c$2);
    let tmpAssignComputedRhs$1 = k[tmpClusterSSA_c$2];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$2);
    }
    r[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = r[e$1];
  return tmpReturnArg$1;
};
tmpSSA_e = function () {
  return `\\w+`;
};
$(
  eval(
    $dotCall(
      $string_replace,
      `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`,
      `replace`,
      new $regex_constructor(`\\b\\w+\\b`, `g`),
      tmpArrElement,
    ),
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c + 29;
  const e = $String_fromCharCode( d );
  return e;
};
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g / 52;
  const i = $Number_parseInt( h );
  return i;
};
const j = {};
let k = function($$0 ) {
  const l = $$0;
  debugger;
  let m = "";
  const n = l < 52;
  if (n) {

  }
  else {
    const o = p( f, l );
    m = k( o );
  }
  const q = l % 52;
  const r = q > 35;
  if (r) {
    const s = p( a, q );
    const t = m + s;
    return t;
  }
  else {
    const u = $dotCall( $number_toString, q, "toString", 36 );
    const v = m + u;
    return v;
  }
};
const w = k( 51 );
j[w] = "not_expr";
const x = k( 50 );
j[x] = "u0020g";
const y = k( 49 );
j[y] = "x20f";
const z = k( 48 );
j[z] = "10";
const ba = k( 47 );
j[ba] = "toString";
const bb = k( 46 );
j[bb] = "split";
const bc = k( 45 );
j[bc] = "36";
const bd = k( 44 );
j[bd] = "RegExp";
const be = k( 43 );
j[be] = "new";
const bf = k( 42 );
j[bf] = "String";
let bg = 41;
const bh = k( 41 );
j[bh] = "eval";
const bi = [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "function", "return", "if", "replace", "while", "eval", "String", "new", "RegExp", "36", "split", "toString", "10", "x20f", "u0020g", "not_expr" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const bj = bg;
  bg = bg - 1;
  if (bj) {
    const bk = k( bg );
    let bl = bi[ bg ];
    if (bl) {

    }
    else {
      bl = k( bg );
    }
    j[bk] = bl;
  }
  else {
    break;
  }
}
const bm = function($$0 ) {
  const bn = $$0;
  debugger;
  const bo = j[ bn ];
  return bo;
};
k = function() {
  debugger;
  return "\\w+";
};
const bp = new $regex_constructor( "\\b\\w+\\b", "g" );
const bq = $dotCall( $string_replace, "F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'\"0\\\\\\\\`1\\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6${7}8\\\\\\\\/9\"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))", "replace", bp, bm );
const br = eval( bq );
$( br );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function ($$0, $$1, $$2, $$3, $$4, $$5) {
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
      const tmpCallCallee = e;
      let tmpCalleeParam$3 = c$1 / a;
      let tmpCalleeParam$1 = $Number_parseInt(tmpCalleeParam$3);
      tmpBinBothLhs = e(tmpCalleeParam$1);
    }
    let tmpBinBothRhs = undefined;
    c$1 = c$1 % a;
    const tmpBinLhs = c$1;
    const tmpIfTest$1 = tmpBinLhs > 35;
    if (tmpIfTest$1) {
      const tmpMCF = $String_fromCharCode;
      const tmpMCP = c$1 + 29;
      tmpBinBothRhs = $dotCall(tmpMCF, $string_constructor, `fromCharCode`, tmpMCP);
    } else {
      const tmpMCF$1 = c$1.toString;
      tmpBinBothRhs = $dotCall(tmpMCF$1, c$1, `toString`, 36);
    }
    const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
    return tmpReturnArg;
  };
  const tmpMCF$3 = $string_replace;
  const tmpMCP$1 = new $regex_constructor(`^`, ``);
  const tmpIfTest$3 = $dotCall(tmpMCF$3, ``, `replace`, tmpMCP$1, $string_constructor);
  if (tmpIfTest$3) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = $coerce(c, `number`);
      c = tmpPostUpdArgIdent - 1;
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
    const tmpPostUpdArgIdent$1 = $coerce(c, `number`);
    c = tmpPostUpdArgIdent$1 - 1;
    const tmpIfTest$7 = tmpPostUpdArgIdent$1;
    if (tmpIfTest$7) {
      const tmpIfTest$9 = k[c];
      if (tmpIfTest$9) {
        const tmpMCF$5 = p.replace;
        const tmpNewCallee = RegExp;
        const tmpBinBothLhs$1 = `\\b`;
        const tmpBinBothRhs$1 = e(c);
        const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
        const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
        let tmpCalleeParam$5 = `${tmpStringConcatR}\\b`;
        const tmpMCP$3 = new tmpNewCallee(tmpCalleeParam$5, `g`);
        const tmpMCP$5 = k[c];
        p = $dotCall(tmpMCF$5, p, `replace`, tmpMCP$3, tmpMCP$5);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCallCallee$1 = tmpCallComplexCallee;
const tmpMCF$7 = $string_split;
let tmpCalleeParam$7 = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
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
let tmpCalleeParam$9 = {};
let tmpCalleeParam = tmpCallComplexCallee(
  `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`,
  52,
  52,
  tmpCalleeParam$7,
  0,
  tmpCalleeParam$9,
);
const x = eval(tmpCalleeParam);
$(x);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) can we always safely clone ident refs in this case?
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a`b"c\'d\\e f g${not_expr}h/i'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
