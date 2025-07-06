# Preval test case

# bug.md

> If hoisting > Bug
>
> At the time of writing this would lead to const assignments

This is as minimal as I could get it while retaining the bug.

## Input

`````js filename=intro
function f() {
  const obj = {};

  function g() { return _0xb45009(); }

  function twice(arg) { return $(arg - 1); }

  if (twice(1)) {
    const  a = obj[g()]();
    twice();
  } else {
    const b = unknown ? function() { return false; } : function() {};
    unknown = false
    return b;
  }
};

$('temp:', f)
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(0);
  if (tmpIfTest) {
    const tmpClusterSSA_tmpMCCP /*:unknown*/ = _0xb45009();
    const obj /*:object*/ /*truthy*/ = {};
    const tmpMCF /*:unknown*/ = obj[tmpClusterSSA_tmpMCCP];
    $dotCall(tmpMCF, obj, undefined);
    $($Number_NaN);
    return undefined;
  } else {
    let tmpMCCP /*:function*/ /*ternaryConst*/ /*truthy*/ = undefined;
    if (unknown) {
      tmpMCCP = function $pcompiled() {
        debugger;
        return false;
      };
    } else {
      tmpMCCP = function $pcompiled() {
        debugger;
        return undefined;
      };
    }
    unknown = false;
    return tmpMCCP;
  }
};
$(`temp:`, f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`temp:`, function () {
  if ($(0)) {
    const tmpClusterSSA_tmpMCCP = _0xb45009();
    const obj = {};
    obj[tmpClusterSSA_tmpMCCP]();
    $($Number_NaN);
  } else {
    let tmpMCCP = undefined;
    if (unknown) {
      tmpMCCP = function $pcompiled() {
        return false;
      };
    } else {
      tmpMCCP = function $pcompiled() {};
    }
    unknown = false;
    return tmpMCCP;
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 0 );
  if (b) {
    const c = _0xb45009();
    const d = {};
    const e = d[ c ];
    $dotCall( e, d, undefined );
    $( $Number_NaN );
    return undefined;
  }
  else {
    let f = undefined;
    if (unknown) {
      f = function $pcompiled() {
        debugger;
        return false;
      };
    }
    else {
      f = function $pcompiled() {
        debugger;
        return undefined;
      };
    }
    unknown = false;
    return f;
  }
};
$( "temp:", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpReturnArg = _0xb45009();
    return tmpReturnArg;
  };
  let twice = function ($$0) {
    let arg = $$0;
    debugger;
    let tmpCalleeParam = arg - 1;
    const tmpReturnArg$1 = $(tmpCalleeParam);
    return tmpReturnArg$1;
  };
  const obj = {};
  const tmpIfTest = twice(1);
  if (tmpIfTest) {
    const tmpMCCO = obj;
    const tmpMCCP = g();
    const tmpMCF = tmpMCCO[tmpMCCP];
    const a = $dotCall(tmpMCF, tmpMCCO, undefined);
    twice();
    return undefined;
  } else {
    let b = undefined;
    if (unknown) {
      b = function () {
        debugger;
        return false;
      };
    } else {
      b = function () {
        debugger;
        return undefined;
      };
    }
    unknown = false;
    return b;
  }
};
$(`temp:`, f);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


BAD@! Found 2 implicit global bindings:

_0xb45009, unknown


## Runtime Outcome


Should call `$` with:
 - 1: 'temp:', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
