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
const tmpFree$1 /*:(number)=>number*/ = function $free($$0) {
  const c$1 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:number*/ = c$1 / 52;
  const tmpRet$1 /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  return tmpRet$1;
};
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpClusterSSA_c$2 /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = tmpClusterSSA_c$2 + 29;
  const tmpRet /*:string*/ = $String_fromCharCode(tmpMCP);
  return tmpRet;
};
const tmpCalleeParam$9 /*:object*/ = {};
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = tmpCalleeParam$9[e$1];
  return tmpReturnArg$1;
};
let e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 52;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree$1, c$2);
    tmpBinBothLhs = e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$4 /*:number*/ = c$2 % 52;
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_c$4 > 35;
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $frfr(tmpFree, tmpClusterSSA_c$4);
    const tmpClusterSSA_tmpReturnArg /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$4, `toString`, 36);
    const tmpClusterSSA_tmpReturnArg$1 /*:string*/ = tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs$1;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp /*:unknown*/ = e(51);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `not_expr`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = e(50);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `u0020g`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = e(49);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `x20f`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = e(48);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `10`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = e(47);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = e(46);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = e(45);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `36`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 /*:number*/ = 41;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$10] = `eval`;
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
  const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 /*:unknown*/ = e(tmpClusterSSA_c$1);
    let tmpAssignComputedRhs$1 /*:unknown*/ = tmpCalleeParam$7[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = e(tmpClusterSSA_c$1);
    }
    tmpCalleeParam$9[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
e = function () {
  debugger;
  return `\\w+`;
};
const tmpMCP$3 /*:regex*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const p /*:string*/ = $dotCall(
  $string_replace,
  `F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'"0\\\\\\\\\`1\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6\${7}8\\\\\\\\/9"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))`,
  `replace`,
  tmpMCP$3,
  tmpArrElement,
);
const x /*:unknown*/ = eval(p);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(c$1) {
  const tmpRet$1 = $Number_parseInt(c$1 / 52);
  return tmpRet$1;
};
const tmpFree = function $free(tmpClusterSSA_c$2) {
  const tmpRet = $String_fromCharCode(tmpClusterSSA_c$2 + 29);
  return tmpRet;
};
const tmpCalleeParam$9 = {};
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = tmpCalleeParam$9[e$1];
  return tmpReturnArg$1;
};
let e = function (c$2) {
  let tmpBinBothLhs = ``;
  if (!(c$2 < 52)) {
    tmpBinBothLhs = e($frfr(tmpFree$1, c$2));
  }
  const tmpClusterSSA_c$4 = c$2 % 52;
  if (tmpClusterSSA_c$4 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + $frfr(tmpFree, tmpClusterSSA_c$4);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + $dotCall($number_toString, tmpClusterSSA_c$4, `toString`, 36);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp = e(51);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `not_expr`;
const tmpAssignComMemLhsProp$1 = e(50);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `u0020g`;
const tmpAssignComMemLhsProp$2 = e(49);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `x20f`;
const tmpAssignComMemLhsProp$3 = e(48);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `10`;
const tmpAssignComMemLhsProp$4 = e(47);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 = e(46);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 = e(45);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `36`;
const tmpAssignComMemLhsProp$7 = e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 = e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 = e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 = 41;
const tmpAssignComMemLhsProp$10 = e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$10] = `eval`;
const tmpCalleeParam$7 = [
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
while (true) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 = e(tmpClusterSSA_c$1);
    let tmpAssignComputedRhs$1 = tmpCalleeParam$7[tmpClusterSSA_c$1];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = e(tmpClusterSSA_c$1);
    }
    tmpCalleeParam$9[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
e = function () {
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
  const d = c / 52;
  const e = $Number_parseInt( d );
  return e;
};
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g + 29;
  const i = $String_fromCharCode( h );
  return i;
};
const j = {};
const k = function($$0 ) {
  const l = $$0;
  debugger;
  const m = j[ l ];
  return m;
};
let n = function($$0 ) {
  const o = $$0;
  debugger;
  let p = "";
  const q = o < 52;
  if (q) {

  }
  else {
    const r = s( a, o );
    p = n( r );
  }
  const t = o % 52;
  const u = t > 35;
  if (u) {
    const v = s( f, t );
    const w = p + v;
    return w;
  }
  else {
    const x = $dotCall( $number_toString, t, "toString", 36 );
    const y = p + x;
    return y;
  }
};
const z = n( 51 );
j[z] = "not_expr";
const ba = n( 50 );
j[ba] = "u0020g";
const bb = n( 49 );
j[bb] = "x20f";
const bc = n( 48 );
j[bc] = "10";
const bd = n( 47 );
j[bd] = "toString";
const be = n( 46 );
j[be] = "split";
const bf = n( 45 );
j[bf] = "36";
const bg = n( 44 );
j[bg] = "RegExp";
const bh = n( 43 );
j[bh] = "new";
const bi = n( 42 );
j[bi] = "String";
let bj = 41;
const bk = n( 41 );
j[bk] = "eval";
const bl = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "return", "if", "replace", "while", "eval", "String", "new", "RegExp", "36", "split", "toString", "10", "x20f", "u0020g", "not_expr" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const bm = bj;
  bj = bj - 1;
  if (bm) {
    const bn = n( bj );
    let bo = bl[ bj ];
    if (bo) {

    }
    else {
      bo = n( bj );
    }
    j[bn] = bo;
  }
  else {
    break;
  }
}
n = function() {
  debugger;
  return "\\w+";
};
const bp = new $regex_constructor( "\\b\\w+\\b", "g" );
const bq = $dotCall( $string_replace, "F(A(p,a,c,k,e,r){e=A(c){B c.L(a)};C(!''.D(/^/,G)){E(c--)r[e(c)]=k[c]||e(c);k=[A(e){B r[e]}];e=A(){B'\\\\w+'};c=1};E(c--)C(k[c])p=p.D(H I('\\\\b'+e(c)+'\\\\b','g'),k[c]);B p}('s(f(p,a,c,k,e,r){e=l;m(!\\'\\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\\'\\\\\\\\w+\\'};c=1};o(c--)m(k[c])p=p.n(t u(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);j p}(\\'\"0\\\\\\\\`1\\\\\\\\\"2\\\\\\\\\\\\\\'3\\\\\\\\\\\\\\\\4\\\\\\\\5\\\\\\\\6${7}8\\\\\\\\/9\"\\',q,q,\\'a|b|c|d|e|v|x|y|h|i\\'.z(\\'|\\'),0,{}))',J,J,'|||||||||||||||A||||B||G|C|D|E||M||F|H|I|N||O|P|K'.K('|'),0,{}))", "replace", bp, k );
const br = eval( bq );
$( br );
`````


## Todos triggered


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
