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
  const tmpClusterSSA_c$2 /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = tmpClusterSSA_c$2 + 29;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP);
  return tmpRet$1;
};
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const c$1 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:number*/ = c$1 / 52;
  const tmpRet /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  return tmpRet;
};
const tmpCalleeParam$9 /*:object*/ = {};
let e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 52;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$4 /*:number*/ = c$2 % 52;
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_c$4 > 35;
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $frfr(tmpFree$1, tmpClusterSSA_c$4);
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
const k /*:array*/ = [
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
    let tmpAssignComputedRhs$1 /*:unknown*/ = k[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = e(tmpClusterSSA_c$1);
    }
    tmpCalleeParam$9[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = tmpCalleeParam$9[e$1];
  return tmpReturnArg$1;
};
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
const tmpFree$1 = function $free(tmpClusterSSA_c$2) {
  const tmpRet$1 = $String_fromCharCode(tmpClusterSSA_c$2 + 29);
  return tmpRet$1;
};
const tmpFree = function $free(c$1) {
  const tmpRet = $Number_parseInt(c$1 / 52);
  return tmpRet;
};
const tmpCalleeParam$9 = {};
let e = function (c$2) {
  let tmpBinBothLhs = ``;
  if (!(c$2 < 52)) {
    tmpBinBothLhs = e($frfr(tmpFree, c$2));
  }
  const tmpClusterSSA_c$4 = c$2 % 52;
  if (tmpClusterSSA_c$4 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + $frfr(tmpFree$1, tmpClusterSSA_c$4);
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
const k = [
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
    let tmpAssignComputedRhs$1 = k[tmpClusterSSA_c$1];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = e(tmpClusterSSA_c$1);
    }
    tmpCalleeParam$9[tmpAssignComMemLhsProp$11] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = tmpCalleeParam$9[e$1];
  return tmpReturnArg$1;
};
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
const bi = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "return", "if", "replace", "while", "eval", "String", "new", "RegExp", "36", "split", "toString", "10", "x20f", "u0020g", "not_expr" ];
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
