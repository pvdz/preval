# Preval test case

# packer_twice.md

> String escapes > Packer twice

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('bo\`\'\"o')` after Dean's PACKER minifier.
It is packed twice (output becomes input)

## Input

`````js filename=intro
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0.1(\'2\\`\\\'\\"\\3\')',4,4,'console|log|bo|x20o'.split('|'),0,{}))
`````

## Settled


`````js filename=intro
eval(`console.log('bo\\\`\\'\\"\\x20o')`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
eval(`console.log('bo\\\`\\'\\"\\x20o')`);
`````

## Pre Normal


`````js filename=intro
eval(
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
  })(`0.1('2\\\`\\'\\"\\3')`, 4, 4, `console|log|bo|x20o`.split(`|`), 0, {}),
);
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
  e = String;
  const tmpCalleeParam$5 = /^/;
  const tmpCalleeParam$7 = String;
  const tmpIfTest = ``.replace(tmpCalleeParam$5, tmpCalleeParam$7);
  if (tmpIfTest) {
  } else {
    while (true) {
      const tmpPostUpdArgIdent = $coerce(c, `number`);
      c = tmpPostUpdArgIdent - 1;
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
    const tmpPostUpdArgIdent$1 = $coerce(c, `number`);
    c = tmpPostUpdArgIdent$1 - 1;
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
const tmpCalleeParam$1 = `console|log|bo|x20o`.split(`|`);
const tmpCalleeParam$3 = {};
const tmpCalleeParam = tmpCallCallee(`0.1('2\\\`\\'\\"\\3')`, 4, 4, tmpCalleeParam$1, 0, tmpCalleeParam$3);
eval(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
eval( "console.log('bo\\`\\'\\\"\\x20o')" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- objects in isFree check
