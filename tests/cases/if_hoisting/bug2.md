# Preval test case

# bug2.md

> If hoisting > Bug2

## Input

`````js filename=intro
const h = $(function(){ return 'valueOf'});
let unknown = $(function(){});
function f() {
  const obj = {};

  function g() { return h(); }

  function twice(arg) { return $('twice:', arg - 1); }

  if (twice(1)) {
    const  a = obj[g()]();
    twice(); // This one would ned up printing 0 rather than NaN
  } else {
    const b = unknown ? function() { return false; } : function() {};
    unknown = false
    return b;
  }
};

$('temp:', f);
f();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(`twice:`, 0);
  if (tmpIfTest) {
    const tmpClusterSSA_tmpMCCP /*:unknown*/ = h();
    const obj /*:object*/ /*truthy*/ = {};
    const tmpMCF /*:unknown*/ = obj[tmpClusterSSA_tmpMCCP];
    $dotCall(tmpMCF, obj, undefined);
    $(`twice:`, $Number_NaN);
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
const tmpCalleeParam$1 /*:()=>string*/ = function $pcompiled() {
  debugger;
  return `valueOf`;
};
const h /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
let unknown /*:unknown*/ = $(tmpCalleeParam$3);
$(`temp:`, f);
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($(`twice:`, 0)) {
    const tmpClusterSSA_tmpMCCP = h();
    const obj = {};
    obj[tmpClusterSSA_tmpMCCP]();
    $(`twice:`, $Number_NaN);
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
};
const h = $(function $pcompiled() {
  return `valueOf`;
});
let unknown = $(function $pcompiled() {});
$(`temp:`, f);
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( "twice:", 0 );
  if (b) {
    const c = d();
    const e = {};
    const f = e[ c ];
    $dotCall( f, e, undefined );
    $( "twice:", $Number_NaN );
    return undefined;
  }
  else {
    let g = undefined;
    if (h) {
      g = function $pcompiled() {
        debugger;
        return false;
      };
    }
    else {
      g = function $pcompiled() {
        debugger;
        return undefined;
      };
    }
    h = false;
    return g;
  }
};
const i = function $pcompiled() {
  debugger;
  return "valueOf";
};
const d = $( i );
const j = function $pcompiled() {
  debugger;
  return undefined;
};
let h = $( j );
$( "temp:", a );
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpReturnArg = h();
    return tmpReturnArg;
  };
  let twice = function ($$0) {
    let arg = $$0;
    debugger;
    let tmpCalleeParam = arg - 1;
    const tmpReturnArg$1 = $(`twice:`, tmpCalleeParam);
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
let tmpCalleeParam$1 = function () {
  debugger;
  return `valueOf`;
};
const h = $(tmpCalleeParam$1);
let tmpCalleeParam$3 = function () {
  debugger;
  return undefined;
};
let unknown = $(tmpCalleeParam$3);
$(`temp:`, f);
f();
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 'temp:', '<function>'
 - 4: 'twice:', 0
 - 5: 'twice:', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
