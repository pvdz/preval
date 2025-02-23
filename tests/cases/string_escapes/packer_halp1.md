# Preval test case

# packer_halp1.md

> String escapes > Packer halp1
>
> This is the following code packed with Dean's packer (https://richosoft2.co.uk/resources/jspack/)
> 
> ```
> "a\`b\"c\'d\\e\x20f\u0020g${not_expr}h\/i"
> ```
> 
> Encoded once.

## Input

`````js filename=intro
const x = eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('"0\\`1\\"2\\\'3\\\\4\\5\\6${7}8\\/9"',10,10,'a|b|c|d|e|x20f|u0020g|not_expr|h|i'.split('|'),0,{}));
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
    e = String;
    if (!``.replace(/^/, String)) {
      while (c--) r[c] = k[c] || c;
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
  })(`"0\\\`1\\"2\\'3\\\\4\\5\\6\${7}8\\/9"`, 10, 10, `a|b|c|d|e|x20f|u0020g|not_expr|h|i`.split(`|`), 0, {}),
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
  e = String;
  const tmpCalleeParam$13 = /^/;
  const tmpCalleeParam$15 = String;
  const tmpIfTest = ``.replace(tmpCalleeParam$13, tmpCalleeParam$15);
  if (tmpIfTest) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = c;
      c = c - 1;
      const tmpIfTest$1 = tmpPostUpdArgIdent;
      if (tmpIfTest$1) {
        const tmpAssignComputedObj = r;
        const tmpAssignComputedProp = c;
        let tmpAssignComputedRhs = k[c];
        if (tmpAssignComputedRhs) {
        } else {
          tmpAssignComputedRhs = c;
        }
        tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      } else {
        break;
      }
    }
    const tmpArrElement = function ($$0) {
      let e$1 = $$0;
      debugger;
      const tmpReturnArg = r[e$1];
      return tmpReturnArg;
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
        const tmpCalleeParam$21 = `${tmpStringConcatR}\\b`;
        const tmpCalleeParam$23 = `g`;
        const tmpCalleeParam$17 = new tmpNewCallee(tmpCalleeParam$21, tmpCalleeParam$23);
        const tmpCalleeParam$19 = k[c];
        p = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$17, tmpCalleeParam$19);
      } else {
      }
    } else {
      break;
    }
  }
  return p;
};
const tmpCalleeParam$1 = `"0\\\`1\\"2\\'3\\\\4\\5\\6\${7}8\\/9"`;
const tmpCalleeParam$3 = 10;
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$7 = `a|b|c|d|e|x20f|u0020g|not_expr|h|i`.split(`|`);
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
const x /*:unknown*/ = eval(`"a\\\`b\\"c\\'d\\\\e\\x20f\\u0020g\${not_expr}h\\/i"`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = eval( "\"a\\`b\\\"c\\'d\\\\e\\x20f\\u0020g${not_expr}h\\/i\"" );
$( a );
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
