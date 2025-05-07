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
  const tmpCalleeParam$3 /*:number*/ = c$1 / 45;
  const tmpRet /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  return tmpRet;
};
const tmpCalleeParam$9 /*:object*/ = {};
let e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 45;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$4 /*:number*/ = c$2 % 45;
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
const tmpAssignComMemLhsProp /*:unknown*/ = e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = e(40);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = e(39);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = e(38);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = e(37);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = e(36);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = e(35);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 /*:number*/ = 34;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = e(34);
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
  `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
  `replace`,
  tmpMCP$3,
  tmpArrElement,
);
eval(p);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(tmpClusterSSA_c$2) {
  const tmpRet$1 = $String_fromCharCode(tmpClusterSSA_c$2 + 29);
  return tmpRet$1;
};
const tmpFree = function $free(c$1) {
  const tmpRet = $Number_parseInt(c$1 / 45);
  return tmpRet;
};
const tmpCalleeParam$9 = {};
let e = function (c$2) {
  let tmpBinBothLhs = ``;
  if (!(c$2 < 45)) {
    tmpBinBothLhs = e($frfr(tmpFree, c$2));
  }
  const tmpClusterSSA_c$4 = c$2 % 45;
  if (tmpClusterSSA_c$4 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + $frfr(tmpFree$1, tmpClusterSSA_c$4);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + $dotCall($number_toString, tmpClusterSSA_c$4, `toString`, 36);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp = e(44);
tmpCalleeParam$9[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 = e(43);
tmpCalleeParam$9[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 = e(42);
tmpCalleeParam$9[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 = e(41);
tmpCalleeParam$9[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 = e(40);
tmpCalleeParam$9[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 = e(39);
tmpCalleeParam$9[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 = e(38);
tmpCalleeParam$9[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 = e(37);
tmpCalleeParam$9[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 = e(36);
tmpCalleeParam$9[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 = e(35);
tmpCalleeParam$9[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$1 = 34;
const tmpAssignComMemLhsProp$10 = e(34);
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
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = tmpCalleeParam$9[e$1];
  return tmpReturnArg$1;
};
e = function () {
  return `\\w+`;
};
eval(
  $dotCall(
    $string_replace,
    `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
    `replace`,
    new $regex_constructor(`\\b\\w+\\b`, `g`),
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
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g / 45;
  const i = $Number_parseInt( h );
  return i;
};
const j = {};
let k = function($$0 ) {
  const l = $$0;
  debugger;
  let m = "";
  const n = l < 45;
  if (n) {

  }
  else {
    const o = p( f, l );
    m = k( o );
  }
  const q = l % 45;
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
const w = k( 44 );
j[w] = "x20o";
const x = k( 43 );
j[x] = "bo";
const y = k( 42 );
j[y] = "log";
const z = k( 41 );
j[z] = "console";
const ba = k( 40 );
j[ba] = "toString";
const bb = k( 39 );
j[bb] = "split";
const bc = k( 38 );
j[bc] = "28";
const bd = k( 37 );
j[bd] = "RegExp";
const be = k( 36 );
j[be] = "new";
const bf = k( 35 );
j[bf] = "String";
let bg = 34;
const bh = k( 34 );
j[bh] = "eval";
const bi = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "return", "if", "replace", "", "while", "eval", "String", "new", "RegExp", "28", "split", "toString", "console", "log", "bo", "x20o" ];
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
const bq = $dotCall( $string_replace, "y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))", "replace", bp, bm );
eval( bq );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
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
