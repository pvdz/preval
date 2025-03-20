# Preval test case

# triple_ident_call_case.md

> Self assign closure > Triple ident call case
>
> This is a tricky case that comes up in a certain obfuscator.

It starts with the init. That's three var decls where the first two alias another function and the third
calls the first alias. This call "seals" the function.
The function is `a`. It's got the main data array with encoded strings. This array is pivotal to unlocking
the rest of the script because once it clears the first loop, the array can be inlined. But, since function
`a` is not immediately called, we have to do explicit tracking to ensure semantics are properly retained.

Since the second var decl merely creates an alias, there's no operation and no risk of any side effects
being called. So we can inspect the third var decl. If that calls the first alias, then we know for sure 
that `a` can not have been invoked yet and that this is in fact the first call to `a`.

Since that's the case, this alias call will "seal" a. The alias will receive the sealed array as well so
we don't have to worry about the return value. And the alias is not used any further (that would be an
issue) so that's also clear.

Then the question remains how to transform the function. In this case it's very straightforward: Since the
array is closed, there's only one copy, meaning everyone uses the same array instance. In that case it may
as well be global. And that's exactly what we're going to do. (Technically it goes one scope up, but same
principles apply in a non-global case).

The array is global and the function simply returns the global array. That turns the function into a so
called "trampoline" function, on a constant array, so we can trivially eliminate it leaving original calls
to `a()` with a reference to the global "closed" array instance instead.

Since the array is a simple set of strings, the inlining is simple as well.

It's not hard to throw a monkey wrench into this logic but as it stands, it works.

Not sure if this test case encapsulates that logic but it's more for illustration purposes than anything else.

Oh and we have more general self sealing function transforms but in this case `b` prevents it from applying.
As we can see, once `a()` resolves to a global array, `b()` can apply a similar self sealing function transform
and be eliminated quickly, too.

It's then left to free-loops on the while in order to resolve it quickly. In this case, the $() call prevents that.

## Input

`````js filename=intro
let a/*:()=>*/ = function() {
  // Main data array
  const arr/*:array*/ = [
    `o+qs5DkTS`, `displayNam`, `VQ5vY4Jbig`, `previous`, `nk">`, `TqTwnd5/c+`,
    `FaGG+cRqIi`, `getPrototy`, `ch2p7teUW5`, `binary`, `1549114mYdRSK`, `qfVUyPGyG`, `nV7NqmuKE`, `MVWzWKgjww`,
    `mark`, `//BaPJuXX`, `loaded`, `call`, `he WebCryp`, `RSASSA-PKC`, `E31n2Gh9QE`, `N8h3TKFzuv`, `Stb3euiWtm`, `return`,
    `ILhA`, `G9w0BAQEFA`, `7340072VkQjzG`, `c-link" ta`, `63rBGDGDE`, `b6cIzo9YK`, `RuH/AHrSL6`, `replace`, `encode`,
    `Vk2ghqMihj`, `setPrototy`, `ker.`, `asyncItera`, `t provide `
    // Note: the original had a few thousand elements. This demonstration does not need to have them all.
  ];
  // First call to a will close the array for any future calls to a (but not to aliases that were created before)
  a = function() {
    return arr;
  };
  // It then just calls the closed function and returns the closed array reference.
  const tmpReturnArg = a();
  return tmpReturnArg;
};

let b/*:(number, unknown)=>*/ = function(_0x27b75f/*:number*/, _0x20302b) {
  const _0x216d5b = a();
  b = function(_0x51d865/*:number*/, $$1) {
    const tmpClusterSSA__0x51d865/*:number*/ = _0x51d865 - 345;
    const _0x5e349d = _0x216d5b[tmpClusterSSA__0x51d865];
    return _0x5e349d;
  };
  const tmpReturnArg$14 = b(_0x27b75f, _0x20302b);
  return tmpReturnArg$14;
};
loopStop$3: {
  const alias1 = a;
  const alias2 = b;
  const alias3 = alias1();
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $('loop')
    try {
      const tmpUnaryArg$65/*:number*/ = parseInt(alias2(714));
      const tmpBinLhs$155/*:number*/ = parseInt(alias2(434));
      const tmpUnaryArg$67/*:number*/ = parseInt(alias2(849));
      const tmpBinLhs$162/*:number*/ = parseInt(alias2(679));
      const tmpUnaryArg$69/*:number*/ = parseInt(alias2(599));
      const tmpBinLhs$166/*:number*/ = parseInt(alias2(457));
      if (tmpBinLhs$166) {
        break;
      } else {
        alias3.push(alias3.shift());
      }
    } catch (_0x4f54af$22) {
      alias3.push(alias3.shift());
    }
  }
}
$(a());
`````

## Settled


`````js filename=intro
const a /*:array*/ = [
  `o+qs5DkTS`,
  `displayNam`,
  `VQ5vY4Jbig`,
  `previous`,
  `nk">`,
  `TqTwnd5/c+`,
  `FaGG+cRqIi`,
  `getPrototy`,
  `ch2p7teUW5`,
  `binary`,
  `1549114mYdRSK`,
  `qfVUyPGyG`,
  `nV7NqmuKE`,
  `MVWzWKgjww`,
  `mark`,
  `//BaPJuXX`,
  `loaded`,
  `call`,
  `he WebCryp`,
  `RSASSA-PKC`,
  `E31n2Gh9QE`,
  `N8h3TKFzuv`,
  `Stb3euiWtm`,
  `return`,
  `ILhA`,
  `G9w0BAQEFA`,
  `7340072VkQjzG`,
  `c-link" ta`,
  `63rBGDGDE`,
  `b6cIzo9YK`,
  `RuH/AHrSL6`,
  `replace`,
  `encode`,
  `Vk2ghqMihj`,
  `setPrototy`,
  `ker.`,
  `asyncItera`,
  `t provide `,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  a[369];
  a[89];
  a[504];
  a[334];
  a[254];
  const _0x5e349d$1 /*:primitive*/ = a[112];
  const tmpBinLhs$166 /*:number*/ = parseInt(_0x5e349d$1);
  if (tmpBinLhs$166) {
    break;
  } else {
    const tmpCalleeParam$11 /*:unknown*/ = a.shift();
    a.push(tmpCalleeParam$11);
  }
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [
  `o+qs5DkTS`,
  `displayNam`,
  `VQ5vY4Jbig`,
  `previous`,
  `nk">`,
  `TqTwnd5/c+`,
  `FaGG+cRqIi`,
  `getPrototy`,
  `ch2p7teUW5`,
  `binary`,
  `1549114mYdRSK`,
  `qfVUyPGyG`,
  `nV7NqmuKE`,
  `MVWzWKgjww`,
  `mark`,
  `//BaPJuXX`,
  `loaded`,
  `call`,
  `he WebCryp`,
  `RSASSA-PKC`,
  `E31n2Gh9QE`,
  `N8h3TKFzuv`,
  `Stb3euiWtm`,
  `return`,
  `ILhA`,
  `G9w0BAQEFA`,
  `7340072VkQjzG`,
  `c-link" ta`,
  `63rBGDGDE`,
  `b6cIzo9YK`,
  `RuH/AHrSL6`,
  `replace`,
  `encode`,
  `Vk2ghqMihj`,
  `setPrototy`,
  `ker.`,
  `asyncItera`,
  `t provide `,
];
while (true) {
  $(`loop`);
  a[369];
  a[89];
  a[504];
  a[334];
  a[254];
  if (parseInt(a[112])) {
    break;
  } else {
    a.push(a.shift());
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
  const arr = [
    `o+qs5DkTS`,
    `displayNam`,
    `VQ5vY4Jbig`,
    `previous`,
    `nk">`,
    `TqTwnd5/c+`,
    `FaGG+cRqIi`,
    `getPrototy`,
    `ch2p7teUW5`,
    `binary`,
    `1549114mYdRSK`,
    `qfVUyPGyG`,
    `nV7NqmuKE`,
    `MVWzWKgjww`,
    `mark`,
    `//BaPJuXX`,
    `loaded`,
    `call`,
    `he WebCryp`,
    `RSASSA-PKC`,
    `E31n2Gh9QE`,
    `N8h3TKFzuv`,
    `Stb3euiWtm`,
    `return`,
    `ILhA`,
    `G9w0BAQEFA`,
    `7340072VkQjzG`,
    `c-link" ta`,
    `63rBGDGDE`,
    `b6cIzo9YK`,
    `RuH/AHrSL6`,
    `replace`,
    `encode`,
    `Vk2ghqMihj`,
    `setPrototy`,
    `ker.`,
    `asyncItera`,
    `t provide `,
  ];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
let b = function ($$0, $$1) {
  let _0x27b75f = $$0;
  let _0x20302b = $$1;
  debugger;
  const _0x216d5b = a();
  b = function ($$0, $$1) {
    let _0x51d865 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpClusterSSA__0x51d865 = _0x51d865 - 345;
    const _0x5e349d = _0x216d5b[tmpClusterSSA__0x51d865];
    return _0x5e349d;
  };
  const tmpReturnArg$14 = b(_0x27b75f, _0x20302b);
  return tmpReturnArg$14;
};
loopStop$3: {
  const alias1 = a;
  const alias2 = b;
  const alias3 = alias1();
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`loop`);
    try {
      const tmpUnaryArg$65 = parseInt(alias2(714));
      const tmpBinLhs$155 = parseInt(alias2(434));
      const tmpUnaryArg$67 = parseInt(alias2(849));
      const tmpBinLhs$162 = parseInt(alias2(679));
      const tmpUnaryArg$69 = parseInt(alias2(599));
      const tmpBinLhs$166 = parseInt(alias2(457));
      if (tmpBinLhs$166) {
        break;
      } else {
        alias3.push(alias3.shift());
      }
    } catch (_0x4f54af$22) {
      alias3.push(alias3.shift());
    }
  }
}
$(a());
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  const arr = [
    `o+qs5DkTS`,
    `displayNam`,
    `VQ5vY4Jbig`,
    `previous`,
    `nk">`,
    `TqTwnd5/c+`,
    `FaGG+cRqIi`,
    `getPrototy`,
    `ch2p7teUW5`,
    `binary`,
    `1549114mYdRSK`,
    `qfVUyPGyG`,
    `nV7NqmuKE`,
    `MVWzWKgjww`,
    `mark`,
    `//BaPJuXX`,
    `loaded`,
    `call`,
    `he WebCryp`,
    `RSASSA-PKC`,
    `E31n2Gh9QE`,
    `N8h3TKFzuv`,
    `Stb3euiWtm`,
    `return`,
    `ILhA`,
    `G9w0BAQEFA`,
    `7340072VkQjzG`,
    `c-link" ta`,
    `63rBGDGDE`,
    `b6cIzo9YK`,
    `RuH/AHrSL6`,
    `replace`,
    `encode`,
    `Vk2ghqMihj`,
    `setPrototy`,
    `ker.`,
    `asyncItera`,
    `t provide `,
  ];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
let b = function ($$0, $$1) {
  let _0x27b75f = $$0;
  let _0x20302b = $$1;
  debugger;
  const _0x216d5b = a();
  b = function ($$0, $$1) {
    let _0x51d865 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpClusterSSA__0x51d865 = _0x51d865 - 345;
    const _0x5e349d = _0x216d5b[tmpClusterSSA__0x51d865];
    return _0x5e349d;
  };
  const tmpReturnArg$14 = b(_0x27b75f, _0x20302b);
  return tmpReturnArg$14;
};
const alias1 = a;
const alias2 = b;
const alias3 = alias1();
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  try {
    const tmpCalleeParam = alias2(714);
    const tmpUnaryArg$65 = parseInt(tmpCalleeParam);
    const tmpCalleeParam$1 = alias2(434);
    const tmpBinLhs$155 = parseInt(tmpCalleeParam$1);
    const tmpCalleeParam$3 = alias2(849);
    const tmpUnaryArg$67 = parseInt(tmpCalleeParam$3);
    const tmpCalleeParam$5 = alias2(679);
    const tmpBinLhs$162 = parseInt(tmpCalleeParam$5);
    const tmpCalleeParam$7 = alias2(599);
    const tmpUnaryArg$69 = parseInt(tmpCalleeParam$7);
    const tmpCalleeParam$9 = alias2(457);
    const tmpBinLhs$166 = parseInt(tmpCalleeParam$9);
    if (tmpBinLhs$166) {
      break;
    } else {
      const tmpCallObj = alias3;
      const tmpCallVal = tmpCallObj.push;
      const tmpCalleeParam$11 = alias3.shift();
      $dotCall(tmpCallVal, tmpCallObj, `push`, tmpCalleeParam$11);
    }
  } catch (_0x4f54af$22) {
    const tmpCallObj$1 = alias3;
    const tmpCallVal$1 = tmpCallObj$1.push;
    const tmpCalleeParam$13 = alias3.shift();
    $dotCall(tmpCallVal$1, tmpCallObj$1, `push`, tmpCalleeParam$13);
  }
}
const tmpCalleeParam$15 = a();
$(tmpCalleeParam$15);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "o+qs5DkTS", "displayNam", "VQ5vY4Jbig", "previous", "nk\">", "TqTwnd5/c+", "FaGG+cRqIi", "getPrototy", "ch2p7teUW5", "binary", "1549114mYdRSK", "qfVUyPGyG", "nV7NqmuKE", "MVWzWKgjww", "mark", "//BaPJuXX", "loaded", "call", "he WebCryp", "RSASSA-PKC", "E31n2Gh9QE", "N8h3TKFzuv", "Stb3euiWtm", "return", "ILhA", "G9w0BAQEFA", "7340072VkQjzG", "c-link\" ta", "63rBGDGDE", "b6cIzo9YK", "RuH/AHrSL6", "replace", "encode", "Vk2ghqMihj", "setPrototy", "ker.", "asyncItera", "t provide " ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
  a[ 369 ];
  a[ 89 ];
  a[ 504 ];
  a[ 334 ];
  a[ 254 ];
  const b = a[ 112 ];
  const c = parseInt( b );
  if (c) {
    break;
  }
  else {
    const d = a.shift();
    a.push( d );
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'loop'
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'loop'
 - 5: 'loop'
 - 6: 'loop'
 - 7: 'loop'
 - 8: 'loop'
 - 9: 'loop'
 - 10: 'loop'
 - 11: 'loop'
 - 12: 'loop'
 - 13: 'loop'
 - 14: 'loop'
 - 15: 'loop'
 - 16: 'loop'
 - 17: 'loop'
 - 18: 'loop'
 - 19: 'loop'
 - 20: 'loop'
 - 21: 'loop'
 - 22: 'loop'
 - 23: 'loop'
 - 24: 'loop'
 - 25: 'loop'
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- processArrayWriteReadImmutableBinding slow path
