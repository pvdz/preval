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
const tmpCalleeParam$5 /*:object*/ = {
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
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const e$1 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = tmpCalleeParam$5[e$1];
  return tmpReturnArg$1;
};
let tmpClusterSSA_c$1 /*:number*/ = 25;
const tmpCalleeParam$3 /*:array*/ = [
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
    const tmpAssignComMemLhsProp$1 /*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    let tmpAssignComputedRhs$1 /*:primitive*/ = tmpCalleeParam$3[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    }
    tmpCalleeParam$5[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpMCP$1 /*:regex*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const p /*:string*/ = $dotCall(
  $string_replace,
  `s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('"0\\\\\`1\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6\${7}8\\\\/9"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))`,
  `replace`,
  tmpMCP$1,
  tmpArrElement,
);
const x /*:unknown*/ = eval(p);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$5 = {
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
const tmpArrElement = function (e$1) {
  const tmpReturnArg$1 = tmpCalleeParam$5[e$1];
  return tmpReturnArg$1;
};
let tmpClusterSSA_c$1 = 25;
const tmpCalleeParam$3 = [
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
while (true) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    let tmpAssignComputedRhs$1 = tmpCalleeParam$3[tmpClusterSSA_c$1];
    if (!tmpAssignComputedRhs$1) {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$1, `toString`, 36);
    }
    tmpCalleeParam$5[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
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
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = a[ c ];
  return d;
};
let e = 25;
const f = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "function", "", "", "", "return", "", "String", "if", "replace", "while", "", "10", "", "eval", "new", "RegExp", "x20f", "", "u0020g", "not_expr", "split" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = e;
  e = e - 1;
  if (g) {
    const h = $dotCall( $number_toString, e, "toString", 36 );
    let i = f[ e ];
    if (i) {

    }
    else {
      i = $dotCall( $number_toString, e, "toString", 36 );
    }
    a[h] = i;
  }
  else {
    break;
  }
}
const j = new $regex_constructor( "\\b\\w+\\b", "g" );
const k = $dotCall( $string_replace, "s(f(p,a,c,k,e,r){e=l;m(!''.n(/^/,l)){o(c--)r[c]=k[c]||c;k=[f(e){j r[e]}];e=f(){j'\\\\w+'};c=1};o(c--)m(k[c])p=p.n(t u('\\\\b'+e(c)+'\\\\b','g'),k[c]);j p}('\"0\\\\`1\\\\\"2\\\\\\'3\\\\\\\\4\\\\5\\\\6${7}8\\\\/9\"',q,q,'a|b|c|d|e|v|x|y|h|i'.z('|'),0,{}))", "replace", j, b );
const l = eval( k );
$( l );
`````


## Todos triggered


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
