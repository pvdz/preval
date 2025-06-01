# Preval test case

# triple_ident_call_case.md

> Tofix > triple ident call case
>
> This is a tricky case that comes up in a certain obfuscator.

existing case

we can still implement this as a free loop, right?
just have to fix the heuristic of detecting that the first read is a primitive etc?

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
const arr /*:array*/ = [
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
  const tmpCalleeParam$9 /*:primitive*/ = arr[112];
  const tmpBinLhs$166 /*:number*/ = $Number_parseInt(tmpCalleeParam$9);
  if (tmpBinLhs$166) {
    break;
  } else {
    const tmpMCP /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, tmpMCP);
  }
}
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
while (true) {
  $(`loop`);
  if ($Number_parseInt(arr[112])) {
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "o+qs5DkTS", "displayNam", "VQ5vY4Jbig", "previous", "nk\">", "TqTwnd5/c+", "FaGG+cRqIi", "getPrototy", "ch2p7teUW5", "binary", "1549114mYdRSK", "qfVUyPGyG", "nV7NqmuKE", "MVWzWKgjww", "mark", "//BaPJuXX", "loaded", "call", "he WebCryp", "RSASSA-PKC", "E31n2Gh9QE", "N8h3TKFzuv", "Stb3euiWtm", "return", "ILhA", "G9w0BAQEFA", "7340072VkQjzG", "c-link\" ta", "63rBGDGDE", "b6cIzo9YK", "RuH/AHrSL6", "replace", "encode", "Vk2ghqMihj", "setPrototy", "ker.", "asyncItera", "t provide " ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
  const b = a[ 112 ];
  const c = $Number_parseInt( b );
  if (c) {
    break;
  }
  else {
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

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
    let tmpCalleeParam = alias2(714);
    const tmpUnaryArg$65 = $Number_parseInt(tmpCalleeParam);
    let tmpCalleeParam$1 = alias2(434);
    const tmpBinLhs$155 = $Number_parseInt(tmpCalleeParam$1);
    let tmpCalleeParam$3 = alias2(849);
    const tmpUnaryArg$67 = $Number_parseInt(tmpCalleeParam$3);
    let tmpCalleeParam$5 = alias2(679);
    const tmpBinLhs$162 = $Number_parseInt(tmpCalleeParam$5);
    let tmpCalleeParam$7 = alias2(599);
    const tmpUnaryArg$69 = $Number_parseInt(tmpCalleeParam$7);
    let tmpCalleeParam$9 = alias2(457);
    const tmpBinLhs$166 = $Number_parseInt(tmpCalleeParam$9);
    if (tmpBinLhs$166) {
      break;
    } else {
      const tmpMCF = alias3.push;
      const tmpMCF$1 = alias3.shift;
      const tmpMCP = $dotCall(tmpMCF$1, alias3, `shift`);
      $dotCall(tmpMCF, alias3, `push`, tmpMCP);
    }
  } catch (_0x4f54af$22) {
    const tmpMCF$3 = alias3.push;
    const tmpMCF$5 = alias3.shift;
    const tmpMCP$1 = $dotCall(tmpMCF$5, alias3, `shift`);
    $dotCall(tmpMCF$3, alias3, `push`, tmpMCP$1);
  }
}
let tmpCalleeParam$11 = a();
$(tmpCalleeParam$11);
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) VarStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


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
