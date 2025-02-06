# Preval test case

# dropping_the_d.md

> Tofix > Dropping the d
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

## Input

`````js filename=intro

(function () {
  function c() {
    var c = arguments;
    var b = [];
    b[1] = '';
    b[1] += a(72);
    b[1] += a(101, 108, 108, 111);
    b[1] += a(44, 32, 119, 111);
    b[1] += a(114, 108, 100, 33);
    b[1] += a(32);
    return b[1];
  }
  {
    {
      function e(a, b) {
        return Array.prototype.slice.call(a).concat(Array.prototype.slice.call(b));
      }
      function d() {
        var a = arguments[0], c = Array.prototype.slice.call(arguments, 1);
        var b = function () {
          return a.apply(this, c.concat(Array.prototype.slice.call(arguments)));
        };
        b.prototype = a.prototype;
        return b;
      }
      function f(a, b) {
        return Array.prototype.slice.call(a, b);
      }
      function g(b) {
        var c = {};
        for (var a = 0; a < b.length; a += 2) {
          c[b[a]] = b[a + 1];
        }
        return c;
      }
      function h(a) {
        return a.map(function (a) {
          return String.fromCharCode(a & ~0 >>> 16) + String.fromCharCode(a >> 16);
        }).join('');
      }
      function a() {
        return String.fromCharCode.apply(null, arguments);
      }
    }
    var b = [];
    console.log(d(c, b)() + 123);
  }
}())
`````

## Pre Normal


`````js filename=intro
(function () {
  debugger;
  let b = undefined;
  let c = function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    let b$1 = undefined;
    let c$1 = undefined;
    c$1 = tmpPrevalAliasArgumentsAny;
    b$1 = [];
    b$1[1] = ``;
    b$1[1] += a(72);
    b$1[1] += a(101, 108, 108, 111);
    b$1[1] += a(44, 32, 119, 111);
    b$1[1] += a(114, 108, 100, 33);
    b$1[1] += a(32);
    return b$1[1];
  };
  {
    {
      let e = function ($$0, $$1) {
        let a$3 = $$0;
        let b$3 = $$1;
        debugger;
        return Array.prototype.slice.call(a$3).concat(Array.prototype.slice.call(b$3));
      };
      let d$1 = function () {
        const tmpPrevalAliasArgumentsAny$1 = arguments;
        debugger;
        let a$5 = undefined;
        let b$5 = undefined;
        let c$3 = undefined;
        (a$5 = tmpPrevalAliasArgumentsAny$1[0]), (c$3 = Array.prototype.slice.call(tmpPrevalAliasArgumentsAny$1, 1));
        b$5 = function () {
          const tmpPrevalAliasThis = this;
          const tmpPrevalAliasArgumentsAny$3 = arguments;
          debugger;
          return a$5.apply(tmpPrevalAliasThis, c$3.concat(Array.prototype.slice.call(tmpPrevalAliasArgumentsAny$3)));
        };
        b$5.prototype = a$5.prototype;
        return b$5;
      };
      let f = function ($$0, $$1) {
        let a$7 = $$0;
        let b$7 = $$1;
        debugger;
        return Array.prototype.slice.call(a$7, b$7);
      };
      let g = function ($$0) {
        let b$9 = $$0;
        debugger;
        let a$9 = undefined;
        let c$5 = undefined;
        c$5 = {};
        {
          a$9 = 0;
          while (a$9 < b$9.length) {
            {
              c$5[b$9[a$9]] = b$9[a$9 + 1];
            }
            a$9 += 2;
          }
        }
        return c$5;
      };
      let h = function ($$0) {
        let a$11 = $$0;
        debugger;
        return a$11
          .map(function ($$0) {
            let a$13 = $$0;
            debugger;
            return String.fromCharCode(a$13 & (~0 >>> 16)) + String.fromCharCode(a$13 >> 16);
          })
          .join(``);
      };
      let a$1 = function () {
        const tmpPrevalAliasArgumentsAny$5 = arguments;
        debugger;
        return String.fromCharCode.apply(null, tmpPrevalAliasArgumentsAny$5);
      };
    }
    b = [];
    console.log(d(c, b)() + 123);
  }
})();
`````

## Normalized


`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let b = undefined;
  let c = function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    let b$1 = undefined;
    let c$1 = undefined;
    c$1 = tmpPrevalAliasArgumentsAny;
    b$1 = [];
    b$1[1] = ``;
    const tmpCompoundAssignLhs = b$1[1];
    const tmpAssignComputedObj = b$1;
    const tmpAssignComputedProp = 1;
    const tmpBinBothLhs = tmpCompoundAssignLhs;
    const tmpBinBothRhs = a(72);
    const tmpAssignComputedRhs = tmpBinBothLhs + tmpBinBothRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    const tmpCompoundAssignLhs$1 = b$1[1];
    const tmpAssignComputedObj$1 = b$1;
    const tmpAssignComputedProp$1 = 1;
    const tmpBinBothLhs$1 = tmpCompoundAssignLhs$1;
    const tmpBinBothRhs$1 = a(101, 108, 108, 111);
    const tmpAssignComputedRhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
    const tmpCompoundAssignLhs$3 = b$1[1];
    const tmpAssignComputedObj$3 = b$1;
    const tmpAssignComputedProp$3 = 1;
    const tmpBinBothLhs$3 = tmpCompoundAssignLhs$3;
    const tmpBinBothRhs$3 = a(44, 32, 119, 111);
    const tmpAssignComputedRhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
    tmpAssignComputedObj$3[tmpAssignComputedProp$3] = tmpAssignComputedRhs$3;
    const tmpCompoundAssignLhs$5 = b$1[1];
    const tmpAssignComputedObj$5 = b$1;
    const tmpAssignComputedProp$5 = 1;
    const tmpBinBothLhs$5 = tmpCompoundAssignLhs$5;
    const tmpBinBothRhs$5 = a(114, 108, 100, 33);
    const tmpAssignComputedRhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
    tmpAssignComputedObj$5[tmpAssignComputedProp$5] = tmpAssignComputedRhs$5;
    const tmpCompoundAssignLhs$7 = b$1[1];
    const tmpAssignComputedObj$7 = b$1;
    const tmpAssignComputedProp$7 = 1;
    const tmpBinBothLhs$7 = tmpCompoundAssignLhs$7;
    const tmpBinBothRhs$7 = a(32);
    const tmpAssignComputedRhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
    tmpAssignComputedObj$7[tmpAssignComputedProp$7] = tmpAssignComputedRhs$7;
    const tmpReturnArg = b$1[1];
    return tmpReturnArg;
  };
  let e = function ($$0, $$1) {
    let a$3 = $$0;
    let b$3 = $$1;
    debugger;
    const tmpCompObj = $ArrayPrototype;
    const tmpCallObj$1 = tmpCompObj.slice;
    const tmpCallObj = tmpCallObj$1.call(a$3);
    const tmpCallVal = tmpCallObj.concat;
    const tmpCompObj$1 = $ArrayPrototype;
    const tmpCallObj$3 = tmpCompObj$1.slice;
    const tmpCalleeParam = tmpCallObj$3.call(b$3);
    const tmpReturnArg$1 = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
    return tmpReturnArg$1;
  };
  let d$1 = function () {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    debugger;
    let a$5 = undefined;
    let b$5 = undefined;
    let c$3 = undefined;
    a$5 = tmpPrevalAliasArgumentsAny$1[0];
    const tmpCompObj$3 = $ArrayPrototype;
    const tmpCallObj$5 = tmpCompObj$3.slice;
    c$3 = tmpCallObj$5.call(tmpPrevalAliasArgumentsAny$1, 1);
    b$5 = function () {
      const tmpPrevalAliasThis = this;
      const tmpPrevalAliasArgumentsAny$3 = arguments;
      debugger;
      const tmpCallObj$7 = a$5;
      const tmpCallVal$1 = tmpCallObj$7.apply;
      const tmpCalleeParam$1 = tmpPrevalAliasThis;
      const tmpCallObj$9 = c$3;
      const tmpCallVal$3 = tmpCallObj$9.concat;
      const tmpCompObj$5 = $ArrayPrototype;
      const tmpCallObj$11 = tmpCompObj$5.slice;
      const tmpCalleeParam$5 = tmpCallObj$11.call(tmpPrevalAliasArgumentsAny$3);
      const tmpCalleeParam$3 = $dotCall(tmpCallVal$3, tmpCallObj$9, tmpCalleeParam$5);
      const tmpReturnArg$3 = $dotCall(tmpCallVal$1, tmpCallObj$7, tmpCalleeParam$1, tmpCalleeParam$3);
      return tmpReturnArg$3;
    };
    const tmpAssignMemLhsObj = b$5;
    const tmpAssignMemRhs = a$5.prototype;
    tmpAssignMemLhsObj.prototype = tmpAssignMemRhs;
    return b$5;
  };
  let f = function ($$0, $$1) {
    let a$7 = $$0;
    let b$7 = $$1;
    debugger;
    const tmpCompObj$7 = $ArrayPrototype;
    const tmpCallObj$13 = tmpCompObj$7.slice;
    const tmpReturnArg$5 = tmpCallObj$13.call(a$7, b$7);
    return tmpReturnArg$5;
  };
  let g = function ($$0) {
    let b$9 = $$0;
    debugger;
    let a$9 = undefined;
    let c$5 = undefined;
    c$5 = {};
    a$9 = 0;
    while (true) {
      const tmpBinBothLhs$9 = a$9;
      const tmpBinBothRhs$9 = b$9.length;
      const tmpIfTest = tmpBinBothLhs$9 < tmpBinBothRhs$9;
      if (tmpIfTest) {
        const tmpAssignComMemLhsObj = c$5;
        const tmpAssignComMemLhsProp = b$9[a$9];
        const tmpAssignComputedObj$9 = tmpAssignComMemLhsObj;
        const tmpAssignComputedProp$9 = tmpAssignComMemLhsProp;
        const tmpCompObj$9 = b$9;
        const tmpCompProp = a$9 + 1;
        const tmpAssignComputedRhs$9 = tmpCompObj$9[tmpCompProp];
        tmpAssignComputedObj$9[tmpAssignComputedProp$9] = tmpAssignComputedRhs$9;
        a$9 = a$9 + 2;
      } else {
        break;
      }
    }
    return c$5;
  };
  let h = function ($$0) {
    let a$11 = $$0;
    debugger;
    const tmpCallObj$17 = a$11;
    const tmpCallVal$5 = tmpCallObj$17.map;
    const tmpCalleeParam$7 = function ($$0) {
      let a$13 = $$0;
      debugger;
      const tmpBinBothLhs$13 = a$13;
      const tmpBinLhs = -1;
      const tmpBinBothRhs$13 = tmpBinLhs >>> 16;
      const tmpCalleeParam$9 = tmpBinBothLhs$13 & tmpBinBothRhs$13;
      const tmpBinBothLhs$11 = String.fromCharCode(tmpCalleeParam$9);
      const tmpCalleeParam$11 = a$13 >> 16;
      const tmpBinBothRhs$11 = String.fromCharCode(tmpCalleeParam$11);
      const tmpReturnArg$9 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
      return tmpReturnArg$9;
    };
    const tmpCallObj$15 = $dotCall(tmpCallVal$5, tmpCallObj$17, tmpCalleeParam$7);
    const tmpReturnArg$7 = tmpCallObj$15.join(``);
    return tmpReturnArg$7;
  };
  let a$1 = function () {
    const tmpPrevalAliasArgumentsAny$5 = arguments;
    debugger;
    const tmpCallObj$19 = $String_fromCharCode;
    const tmpReturnArg$11 = tmpCallObj$19.apply(null, tmpPrevalAliasArgumentsAny$5);
    return tmpReturnArg$11;
  };
  b = [];
  const tmpCallObj$21 = console;
  const tmpCallVal$7 = tmpCallObj$21.log;
  const tmpCallComplexCallee$1 = d(c, b);
  const tmpBinLhs$1 = tmpCallComplexCallee$1();
  const tmpCalleeParam$13 = tmpBinLhs$1 + 123;
  $dotCall(tmpCallVal$7, tmpCallObj$21, tmpCalleeParam$13);
  return undefined;
};
tmpCallComplexCallee();
`````

## Output


`````js filename=intro
const c /*:()=>?*/ = function () {
  debugger;
  const b$1 /*:array*/ = [];
  b$1[1] = ``;
  const tmpCompoundAssignLhs = b$1[1];
  const tmpBinBothRhs = a(72);
  const tmpAssignComputedRhs /*:primitive*/ = tmpCompoundAssignLhs + tmpBinBothRhs;
  b$1[1] = tmpAssignComputedRhs;
  const tmpCompoundAssignLhs$1 = b$1[1];
  const tmpBinBothRhs$1 = a(101, 108, 108, 111);
  const tmpAssignComputedRhs$1 /*:primitive*/ = tmpCompoundAssignLhs$1 + tmpBinBothRhs$1;
  b$1[1] = tmpAssignComputedRhs$1;
  const tmpCompoundAssignLhs$3 = b$1[1];
  const tmpBinBothRhs$3 = a(44, 32, 119, 111);
  const tmpAssignComputedRhs$3 /*:primitive*/ = tmpCompoundAssignLhs$3 + tmpBinBothRhs$3;
  b$1[1] = tmpAssignComputedRhs$3;
  const tmpCompoundAssignLhs$5 = b$1[1];
  const tmpBinBothRhs$5 = a(114, 108, 100, 33);
  const tmpAssignComputedRhs$5 /*:primitive*/ = tmpCompoundAssignLhs$5 + tmpBinBothRhs$5;
  b$1[1] = tmpAssignComputedRhs$5;
  const tmpCompoundAssignLhs$7 = b$1[1];
  const tmpBinBothRhs$7 = a(32);
  const tmpAssignComputedRhs$7 /*:primitive*/ = tmpCompoundAssignLhs$7 + tmpBinBothRhs$7;
  b$1[1] = tmpAssignComputedRhs$7;
  const tmpReturnArg = b$1[1];
  return tmpReturnArg;
};
const b /*:array*/ = [];
const tmpCallComplexCallee$1 = d(c, b);
const tmpBinLhs$1 = tmpCallComplexCallee$1();
const tmpCalleeParam$13 /*:primitive*/ = tmpBinLhs$1 + 123;
console.log(tmpCalleeParam$13);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [];
  b[1] = "";
  const c = b[ 1 ];
  const d = a( 72 );
  const e = c + d;
  b[1] = e;
  const f = b[ 1 ];
  const g = a( 101, 108, 108, 111 );
  const h = f + g;
  b[1] = h;
  const i = b[ 1 ];
  const j = a( 44, 32, 119, 111 );
  const k = i + j;
  b[1] = k;
  const l = b[ 1 ];
  const m = a( 114, 108, 100, 33 );
  const n = l + m;
  b[1] = n;
  const o = b[ 1 ];
  const p = a( 32 );
  const q = o + p;
  b[1] = q;
  const r = b[ 1 ];
  return r;
};
const s = [];
const t = d( a, s );
const u = t();
const v = u + 123;
console.log( v );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
const tmpCallComplexCallee$1 = d(function () {
  const b$1 = [];
  b$1[1] = ``;
  const tmpAssignComputedRhs = b$1[1] + a(72);
  b$1[1] = tmpAssignComputedRhs;
  const tmpAssignComputedRhs$1 = b$1[1] + a(101, 108, 108, 111);
  b$1[1] = tmpAssignComputedRhs$1;
  const tmpAssignComputedRhs$3 = b$1[1] + a(44, 32, 119, 111);
  b$1[1] = tmpAssignComputedRhs$3;
  const tmpAssignComputedRhs$5 = b$1[1] + a(114, 108, 100, 33);
  b$1[1] = tmpAssignComputedRhs$5;
  const tmpAssignComputedRhs$7 = b$1[1] + a(32);
  b$1[1] = tmpAssignComputedRhs$7;
  const tmpReturnArg = b$1[1];
  return tmpReturnArg;
}, []);
console.log(tmpCallComplexCallee$1() + 123);
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
