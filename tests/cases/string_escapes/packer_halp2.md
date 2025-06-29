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


## Settled


`````js filename=intro
const r /*:object*/ /*truthy*/ = {
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
  p: `p`,
};
let tmpClusterSSA_c$1 /*:number*/ = 25;
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
  `function`,
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 /*:number*/ = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1 /*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    let tmpAssignComputedRhs$1 /*:primitive*/ = k[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    }
    r[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
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
const tmpMCP$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const tmpClusterSSA_p /*:string*/ = $dotCall(
  $string_replace,
  `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
  `replace`,
  tmpMCP$1,
  tmpArrElement,
);
const x /*:unknown*/ = eval(tmpClusterSSA_p);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const r = { z: `split`, y: `not_expr`, x: `u0020g`, w: `w`, v: `x20f`, u: `RegExp`, t: `new`, s: `eval`, r: `r`, q: `10`, p: `p` };
let tmpClusterSSA_c$1 = 25;
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
  `function`,
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
while (true) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    let tmpAssignComputedRhs$1 = k[tmpClusterSSA_c$1];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    }
    r[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = r[e$1];
  return tmpReturnArg$1;
};
$(
  eval(
    $dotCall(
      $string_replace,
      `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
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
  p: "p",
};
let b = 25;
const c = [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "function", undefined, undefined, undefined, "return", undefined, "String", "if", "replace", "while", undefined, "10", undefined, "eval", "new", "RegExp", "x20f", undefined, "u0020g", "not_expr", "split" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b;
  b = b - 1;
  if (d) {
    const e = $dotCall( $number_toString, b, "toString", 36 );
    let f = c[ b ];
    if (f) {

    }
    else {
      f = $dotCall( $number_toString, b, "toString", 36 );
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
const j = new $regex_constructor( "\\b\\w+\\b", "g" );
const k = $dotCall( $string_replace, "s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('\"0\\\\`1\\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6${7}8\\\\/9\"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))", "replace", j, g );
const l = eval( k );
$( l );
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
    const tmpMCF = c$1.toString;
    const tmpReturnArg = $dotCall(tmpMCF, c$1, `toString`, a);
    return tmpReturnArg;
  };
  const tmpMCF$1 = $string_replace;
  const tmpMCP = new $regex_constructor(`^`, ``);
  const tmpIfTest = $dotCall(tmpMCF$1, ``, `replace`, tmpMCP, $string_constructor);
  if (tmpIfTest) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = $coerce(c, `number`);
      c = tmpPostUpdArgIdent - 1;
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
    const tmpPostUpdArgIdent$1 = $coerce(c, `number`);
    c = tmpPostUpdArgIdent$1 - 1;
    const tmpIfTest$3 = tmpPostUpdArgIdent$1;
    if (tmpIfTest$3) {
      const tmpIfTest$5 = k[c];
      if (tmpIfTest$5) {
        const tmpMCF$3 = p.replace;
        const tmpNewCallee = RegExp;
        const tmpBinBothLhs = `\\b`;
        const tmpBinBothRhs = e(c);
        const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
        const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
        let tmpCalleeParam$1 = `${tmpStringConcatR}\\b`;
        const tmpMCP$1 = new tmpNewCallee(tmpCalleeParam$1, `g`);
        const tmpMCP$3 = k[c];
        p = $dotCall(tmpMCF$3, p, `replace`, tmpMCP$1, tmpMCP$3);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCallCallee = tmpCallComplexCallee;
const tmpMCF$5 = $string_split;
let tmpCalleeParam$3 = [
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
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
let tmpCalleeParam$5 = {};
let tmpCalleeParam = tmpCallComplexCallee(
  `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
  36,
  36,
  tmpCalleeParam$3,
  0,
  tmpCalleeParam$5,
);
const x = eval(tmpCalleeParam);
$(x);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support this ident in isFree CallExpression: $number_toString
- (todo) can we always safely clone ident refs in this case?
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
