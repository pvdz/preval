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


## Settled


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpClusterSSA_c$2 /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = tmpClusterSSA_c$2 + 29;
  const tmpRet /*:string*/ = $String_fromCharCode(tmpMCP);
  return tmpRet;
};
const tmpCalleeParam$9 /*:object*/ = {};
let tmpSSA_e /*:(number)=>unknown*/ = function ($$0) {
  const c$1 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$1 < 45;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 /*:number*/ = c$1 / 45;
    const tmpCalleeParam$1 /*:number*/ = parseInt(tmpCalleeParam$3);
    tmpBinBothLhs = tmpSSA_e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$4 /*:number*/ = c$1 % 45;
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
const tmpAssignComMemLhsProp /*:unknown*/ = tmpSSA_e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = tmpSSA_e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = tmpSSA_e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = tmpSSA_e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = tmpSSA_e(40);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = tmpSSA_e(39);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = tmpSSA_e(38);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = tmpSSA_e(37);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = tmpSSA_e(36);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = tmpSSA_e(35);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 /*:number*/ = 34;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = tmpSSA_e(34);
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
  const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 /*:unknown*/ = tmpSSA_e(tmpClusterSSA_c$1);
    let tmpAssignComputedRhs$1 /*:unknown*/ = tmpCalleeParam$7[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$1);
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
tmpSSA_e = function () {
  debugger;
  return `\\w+`;
};
const tmpMCP$3 /*:regex*/ = /\b\w+\b/g;
const tmpClusterSSA_p /*:string*/ = $dotCall(
  $string_replace,
  `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
  `replace`,
  tmpMCP$3,
  tmpArrElement,
);
eval(tmpClusterSSA_p);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpClusterSSA_c$2) {
  const tmpRet = $String_fromCharCode(tmpClusterSSA_c$2 + 29);
  return tmpRet;
};
const tmpCalleeParam$9 = {};
let tmpSSA_e = function (c$1) {
  let tmpBinBothLhs = ``;
  if (!(c$1 < 45)) {
    tmpBinBothLhs = tmpSSA_e(parseInt(c$1 / 45));
  }
  const tmpClusterSSA_c$4 = c$1 % 45;
  if (tmpClusterSSA_c$4 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + $frfr(tmpFree, tmpClusterSSA_c$4);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + $dotCall($number_toString, tmpClusterSSA_c$4, `toString`, 36);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp = tmpSSA_e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 = tmpSSA_e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 = tmpSSA_e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 = tmpSSA_e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 = tmpSSA_e(40);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 = tmpSSA_e(39);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 = tmpSSA_e(38);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 = tmpSSA_e(37);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 = tmpSSA_e(36);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 = tmpSSA_e(35);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 = 34;
const tmpAssignComMemLhsProp$10 = tmpSSA_e(34);
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
while (true) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$11 = tmpSSA_e(tmpClusterSSA_c$1);
    let tmpAssignComputedRhs$1 = tmpCalleeParam$7[tmpClusterSSA_c$1];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = tmpSSA_e(tmpClusterSSA_c$1);
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
tmpSSA_e = function () {
  return `\\w+`;
};
eval(
  $dotCall(
    $string_replace,
    `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
    `replace`,
    /\b\w+\b/g,
    tmpArrElement,
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
const f = {};
let g = function($$0 ) {
  const h = $$0;
  debugger;
  let i = "";
  const j = h < 45;
  if (j) {

  }
  else {
    const k = h / 45;
    const l = parseInt( k );
    i = g( l );
  }
  const m = h % 45;
  const n = m > 35;
  if (n) {
    const o = p( a, m );
    const q = i + o;
    return q;
  }
  else {
    const r = $dotCall( $number_toString, m, "toString", 36 );
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
const bn = $dotCall( $string_replace, "y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))", "replace", bm, bj );
eval( bn );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) objects in isFree check
- (todo) can we always safely clone ident refs in this case?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
