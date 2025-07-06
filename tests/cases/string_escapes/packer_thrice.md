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
  const tmpClusterSSA_c$1 /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = tmpClusterSSA_c$1 + 29;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP);
  return tmpRet$1;
};
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const c$4 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:number*/ = c$4 / 45;
  const tmpRet /*:number*/ = $Number_parseInt(tmpCalleeParam$3);
  return tmpRet;
};
const r /*:object*/ /*truthy*/ = {};
let tmpSSA_e /*:(number)=>unknown*/ = function ($$0) {
  const c$2 /*:number*/ = $$0;
  debugger;
  let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = ``;
  const tmpIfTest /*:boolean*/ = c$2 < 45;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 /*:number*/ = $frfr(tmpFree, c$2);
    tmpBinBothLhs = tmpSSA_e(tmpCalleeParam$1);
  }
  const tmpClusterSSA_c$3 /*:number*/ = c$2 % 45;
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
const tmpAssignComMemLhsProp /*:unknown*/ = tmpSSA_e(44);
r[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 /*:unknown*/ = tmpSSA_e(43);
r[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 /*:unknown*/ = tmpSSA_e(42);
r[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 /*:unknown*/ = tmpSSA_e(41);
r[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 /*:unknown*/ = tmpSSA_e(40);
r[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 /*:unknown*/ = tmpSSA_e(39);
r[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 /*:unknown*/ = tmpSSA_e(38);
r[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 /*:unknown*/ = tmpSSA_e(37);
r[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 /*:unknown*/ = tmpSSA_e(36);
r[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 /*:unknown*/ = tmpSSA_e(35);
r[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 /*:number*/ = 34;
const tmpAssignComMemLhsProp$10 /*:unknown*/ = tmpSSA_e(34);
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
  `function`,
  `return`,
  `if`,
  `replace`,
  undefined,
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
while ($LOOP_NO_UNROLLS_LEFT) {
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
tmpSSA_e = function $pcompiled() {
  debugger;
  return `\\w+`;
};
const tmpMCP$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
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
const tmpFree$1 = function $free(tmpClusterSSA_c$1) {
  const tmpRet$1 = $String_fromCharCode(tmpClusterSSA_c$1 + 29);
  return tmpRet$1;
};
const tmpFree = function $free(c$4) {
  const tmpRet = $Number_parseInt(c$4 / 45);
  return tmpRet;
};
const r = {};
let tmpSSA_e = function (c$2) {
  let tmpBinBothLhs = ``;
  if (!(c$2 < 45)) {
    tmpBinBothLhs = tmpSSA_e(tmpFree(c$2));
  }
  const tmpClusterSSA_c$3 = c$2 % 45;
  if (tmpClusterSSA_c$3 > 35) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + tmpFree$1(tmpClusterSSA_c$3);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + $dotCall($number_toString, tmpClusterSSA_c$3, `toString`, 36);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
const tmpAssignComMemLhsProp = tmpSSA_e(44);
r[tmpAssignComMemLhsProp] = `x20o`;
const tmpAssignComMemLhsProp$1 = tmpSSA_e(43);
r[tmpAssignComMemLhsProp$1] = `bo`;
const tmpAssignComMemLhsProp$2 = tmpSSA_e(42);
r[tmpAssignComMemLhsProp$2] = `log`;
const tmpAssignComMemLhsProp$3 = tmpSSA_e(41);
r[tmpAssignComMemLhsProp$3] = `console`;
const tmpAssignComMemLhsProp$4 = tmpSSA_e(40);
r[tmpAssignComMemLhsProp$4] = `toString`;
const tmpAssignComMemLhsProp$5 = tmpSSA_e(39);
r[tmpAssignComMemLhsProp$5] = `split`;
const tmpAssignComMemLhsProp$6 = tmpSSA_e(38);
r[tmpAssignComMemLhsProp$6] = `28`;
const tmpAssignComMemLhsProp$7 = tmpSSA_e(37);
r[tmpAssignComMemLhsProp$7] = `RegExp`;
const tmpAssignComMemLhsProp$8 = tmpSSA_e(36);
r[tmpAssignComMemLhsProp$8] = `new`;
const tmpAssignComMemLhsProp$9 = tmpSSA_e(35);
r[tmpAssignComMemLhsProp$9] = `String`;
let tmpClusterSSA_c$2 = 34;
const tmpAssignComMemLhsProp$10 = tmpSSA_e(34);
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
  `function`,
  `return`,
  `if`,
  `replace`,
  undefined,
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
tmpSSA_e = function $pcompiled() {
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
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = b + 29;
  const d = $String_fromCharCode( c );
  return d;
};
const e = function $free($$0 ) {
  const f = $$0;
  debugger;
  const g = f / 45;
  const h = $Number_parseInt( g );
  return h;
};
const i = {};
let j = function($$0 ) {
  const k = $$0;
  debugger;
  let l = "";
  const m = k < 45;
  if (m) {

  }
  else {
    const n = o( e, k );
    l = j( n );
  }
  const p = k % 45;
  const q = p > 35;
  if (q) {
    const r = o( a, p );
    const s = l + r;
    return s;
  }
  else {
    const t = $dotCall( $number_toString, p, "toString", 36 );
    const u = l + t;
    return u;
  }
};
const v = j( 44 );
i[v] = "x20o";
const w = j( 43 );
i[w] = "bo";
const x = j( 42 );
i[x] = "log";
const y = j( 41 );
i[y] = "console";
const z = j( 40 );
i[z] = "toString";
const ba = j( 39 );
i[ba] = "split";
const bb = j( 38 );
i[bb] = "28";
const bc = j( 37 );
i[bc] = "RegExp";
const bd = j( 36 );
i[bd] = "new";
const be = j( 35 );
i[be] = "String";
let bf = 34;
const bg = j( 34 );
i[bg] = "eval";
const bh = [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "function", "return", "if", "replace", undefined, "while", "eval", "String", "new", "RegExp", "28", "split", "toString", "console", "log", "bo", "x20o" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const bi = bf;
  bf = bf - 1;
  if (bi) {
    const bj = j( bf );
    let bk = bh[ bf ];
    if (bk) {

    }
    else {
      bk = j( bf );
    }
    i[bj] = bk;
  }
  else {
    break;
  }
}
const bl = function($$0 ) {
  const bm = $$0;
  debugger;
  const bn = i[ bm ];
  return bn;
};
j = function $pcompiled() {
  debugger;
  return "\\w+";
};
const bo = new $regex_constructor( "\\b\\w+\\b", "g" );
const bp = $dotCall( $string_replace, "y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))", "replace", bo, bl );
eval( bp );
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
  `function`,
  `return`,
  `if`,
  `replace`,
  undefined,
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
let tmpCalleeParam$9 = {};
let tmpCalleeParam = tmpCallComplexCallee(
  `y(s(p,a,c,k,e,r){e=s(c){t c.E(a)};u(!''.v(/^/,z)){x(c--)r[e(c)]=k[c]||e(c);k=[s(e){t r[e]}];e=s(){t'\\\\w+'};c=1};x(c--)u(k[c])p=p.v(A B('\\\\b'+e(c)+'\\\\b','g'),k[c]);t p}('f(5(p,a,c,k,e,r){e=7;8(!\\'\\'.9(/^/,7)){d(c--)r[c]=k[c]||c;k=[5(e){6 r[e]}];e=5(){6\\'\\\\\\\\h+\\'};c=1};d(c--)8(k[c])p=p.9(i j(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);6 p}(\\'0.1(\\\\\\'2\\\\\\\\\`\\\\\\\\\\\\\\'\\\\\\\\"\\\\\\\\3\\\\\\')\\',4,4,\\'l|m|n|o\\'.q(\\'|\\'),0,{}))',C,C,'|||||s|t|z|u|v||||x||y||w|A|B||F|G|H|I||D|'.D('|'),0,{}))`,
  45,
  45,
  tmpCalleeParam$7,
  0,
  tmpCalleeParam$9,
);
eval(tmpCalleeParam);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) array reads var statement with init ObjectExpression
- (todo) can we always safely clone ident refs in this case?
- (todo) objects in isFree check
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support LabeledStatement as statement in let_hoisting noob check
- (todo) support WhileStatement as statement in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
