# Preval test case

# base.md

> Self assign > Closure > Array closures > Triple alias array closure > Base
>
> This is a tricky case that comes up in a certain obfuscator.

This should be the basic case. Point of the test is that the function get collapsed.

## Input

`````js filename=intro
// SHOULD transform
let f = function() {
  // Main data array
  const arr = ['trash', 'fire', 'is', 'hot'];
  // First call to a will close the array for any future calls to a (but not to aliases that were created before)
  f = function() {
    return arr;
  };
  // It then just calls the closed function and returns the closed array reference.
  const r = f();
  return r;
};
// Another self closing function (or whatever it is, it should not be eliminated)
let g = function(x, y) {
  const arr_instance = f();
  g = function(x2, y2) {
    const tmp = x2 - 345;
    const str = arr_instance[tmp];
    return str;
  };
  const tmpReturnArg$14 = g(x, y);
  return tmpReturnArg$14;
};
// The pattern we found would, after normalization, enter a label first
loopStop$3: {
  // The important part about this pattern is these three statements:
  const alias1 = f;                    // Alias the self-closing data array returner
  const alias2 = g;                    // Irrelevant but complicates heuristic
  const alias3 = alias1();             // Now alias gets called, f is sealed, only `alias1` is not sealed now.
  
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $('loop'); // This just prevents the test runner from going long
    try {
      const str = alias2(457);
      const tmpBinLhs$166 = parseInt(str);
      if (tmpBinLhs$166) {
        break;
      } else {
        alias3.push(alias3.shift());
      }
    } catch {
      alias3.push(alias3.shift());
    }
  }
}
$(f()); // Won't be reached in the test
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [`trash`, `fire`, `is`, `hot`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  const str /*:primitive*/ = arr[112];
  const tmpBinLhs$166 /*:number*/ = $Number_parseInt(str);
  if (tmpBinLhs$166) {
    break;
  } else {
    const tmpMCP /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, tmpMCP);
  }
}
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`trash`, `fire`, `is`, `hot`];
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
const a = [ "trash", "fire", "is", "hot" ];
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
let f = function () {
  debugger;
  const arr = [`trash`, `fire`, `is`, `hot`];
  f = function () {
    debugger;
    return arr;
  };
  const r = f();
  return r;
};
let g = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const arr_instance = f();
  g = function ($$0, $$1) {
    let x2 = $$0;
    let y2 = $$1;
    debugger;
    const tmp = x2 - 345;
    const str = arr_instance[tmp];
    return str;
  };
  const tmpReturnArg$14 = g(x, y);
  return tmpReturnArg$14;
};
const alias1 = f;
const alias2 = g;
const alias3 = alias1();
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
  try {
    const str$1 = alias2(457);
    const tmpBinLhs$166 = $Number_parseInt(str$1);
    if (tmpBinLhs$166) {
      break;
    } else {
      const tmpMCF = alias3.push;
      const tmpMCF$1 = alias3.shift;
      const tmpMCP = $dotCall(tmpMCF$1, alias3, `shift`);
      $dotCall(tmpMCF, alias3, `push`, tmpMCP);
    }
  } catch (e) {
    const tmpMCF$3 = alias3.push;
    const tmpMCF$5 = alias3.shift;
    const tmpMCP$1 = $dotCall(tmpMCF$5, alias3, `shift`);
    $dotCall(tmpMCF$3, alias3, `push`, tmpMCP$1);
  }
}
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) ReturnStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) VarStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type EmptyStatement
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
