# Preval test case

# packer_halp2.md

> String escapes > Packer halp2
>
> This is the following code packed with Dean's packer (https://richosoft2.co.uk/resources/jspack/)
> 
> ```
> "a\`b\"c\'d\\e\x20f\u0020g${not_expr}h\/i"
> ```
> 
> Encoded twice. Output is encoded again.

## Input

`````js filename=intro
const x = eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('s(f(p,a,c,k,e,r){e=l;m(!\'\'.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j\'\\\\w+\'};c=1};o(c--)m(k[c])p=p.n(t u(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);j p}(\'"0\\\\`1\\\\"2\\\\\\\'3\\\\\\\\4\\\\5\\\\6${7}8\\\\/9"\',q,q,\'a|b|c|d|e|v|x|y|h|i\'.z(\'|\'),0,{}))',36,36,'|||||||||||||||function||||return||String|if|replace|while||10||eval|new|RegExp|x20f||u0020g|not_expr|split'.split('|'),0,{}));
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
      return c$1.toString(a);
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
    `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
    36,
    36,
    `|||||||||||||||function||||return||String|if|replace|while||10||eval|new|RegExp|x20f||u0020g|not_expr|split`.split(`|`),
    0,
    {},
  ),
);
$(x);
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
    const tmpReturnArg = c$1.toString(a);
    return tmpReturnArg;
  };
  const tmpCalleeParam$5 = /^/;
  const tmpCalleeParam$7 = String;
  const tmpIfTest = ``.replace(tmpCalleeParam$5, tmpCalleeParam$7);
  if (tmpIfTest) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = c;
      c = c - 1;
      const tmpIfTest$1 = tmpPostUpdArgIdent;
      if (tmpIfTest$1) {
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
    const tmpIfTest$3 = tmpPostUpdArgIdent$1;
    if (tmpIfTest$3) {
      const tmpIfTest$5 = k[c];
      if (tmpIfTest$5) {
        const tmpCallObj = p;
        const tmpCallVal = tmpCallObj.replace;
        const tmpNewCallee = RegExp;
        const tmpBinBothLhs = `\\b`;
        const tmpBinBothRhs = e(c);
        const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
        const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
        const tmpCalleeParam$13 = `${tmpStringConcatR}\\b`;
        const tmpCalleeParam$9 = new tmpNewCallee(tmpCalleeParam$13, `g`);
        const tmpCalleeParam$11 = k[c];
        p = $dotCall(tmpCallVal, tmpCallObj, `replace`, tmpCalleeParam$9, tmpCalleeParam$11);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCalleeParam$1 = `|||||||||||||||function||||return||String|if|replace|while||10||eval|new|RegExp|x20f||u0020g|not_expr|split`.split(
  `|`,
);
const tmpCalleeParam$3 = {};
const tmpCalleeParam = tmpCallCallee(
  `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
  36,
  36,
  tmpCalleeParam$1,
  0,
  tmpCalleeParam$3,
);
const x = eval(tmpCalleeParam);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 /*:object*/ = {
  z: `split`,
  y: `not_expr`,
  x: `u0020g`,
  w: `w`,
  v: `x20f`,
  u: `RegExp`,
  t: `new`,
  s: `eval`,
  r: `r`,
  q: `10`,
};
let tmpClusterSSA_c$1 /*:number*/ = 25;
tmpCalleeParam$3.p = `p`;
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
  `function`,
  ``,
  ``,
  ``,
  `return`,
  ``,
  `String`,
  `if`,
  `replace`,
  `while`,
  ``,
  `10`,
  ``,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  ``,
  `u0020g`,
  `not_expr`,
  `split`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1 /*:string*/ = tmpClusterSSA_c$1.toString(36);
    let tmpAssignComputedRhs$1 /*:primitive*/ = tmpCalleeParam$1[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpClusterSSA_c$1.toString(36);
    }
    tmpCalleeParam$3[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
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
const tmpCalleeParam$9 /*:regex*/ = /\b\w+\b/g;
const tmpClusterSSA_p /*:string*/ = `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`.replace(
  tmpCalleeParam$9,
  tmpArrElement,
);
const x /*:unknown*/ = eval(tmpClusterSSA_p);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  z: "split",
  y: "not_expr",
  x: "u0020g",
  w: "w",
  v: "x20f",
  u: "RegExp",
  t: "new",
  s: "eval",
  r: "r",
  q: "10",
};
let b = 25;
a.p = "p";
const c = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "", "", "", "return", "", "String", "if", "replace", "while", "", "10", "", "eval", "new", "RegExp", "x20f", "", "u0020g", "not_expr", "split" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b;
  b = b - 1;
  if (d) {
    const e = b.toString( 36 );
    let f = c[ b ];
    if (f) {

    }
    else {
      f = b.toString( 36 );
    }
    a[e] = f;
  }
  else {
    break;
  }
}
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = a[ h ];
  return i;
};
const j = /\b\w+\b/g;
const k = "s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('\"0\\\\`1\\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6${7}8\\\\/9\"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))".replace( j, g );
const l = eval( k );
$( l );
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
