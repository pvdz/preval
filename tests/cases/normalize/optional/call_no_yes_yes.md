# Preval test case

# call_no_yes_yes.md

> Normalize > Optional > Call no yes yes
>
> Mix optional with regular member call

## Input

`````js filename=intro
function a() {
  const a = {
    a(){ return a; },
    b(){ return a; },
    c(){ return a; },
    d(){ return a; }
  };

  return a;
}
$(a().b?.().c?.().d);
`````


## Settled


`````js filename=intro
const a$1 /*:object*/ /*truthy*/ = {
  a() {
    debugger;
    return a$1;
  },
  b() {
    debugger;
    return a$1;
  },
  c() {
    debugger;
    return a$1;
  },
  d() {
    debugger;
    return a$1;
  },
};
const tmpChainElementObject /*:unknown*/ = a$1.b;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, a$1, `b`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.c;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainElementCall$3 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`);
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$3.d;
    $(tmpChainElementObject$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a$1 = {
  a() {
    return a$1;
  },
  b() {
    return a$1;
  },
  c() {
    return a$1;
  },
  d() {
    return a$1;
  },
};
const tmpChainElementObject = a$1.b;
if (tmpChainElementObject == null) {
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, a$1, `b`);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  if (tmpChainElementObject$1 == null) {
    $(undefined);
  } else {
    $($dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`).d);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a(  ) {
    debugger;
    return a;
  },
  b(  ) {
    debugger;
    return a;
  },
  c(  ) {
    debugger;
    return a;
  },
  d(  ) {
    debugger;
    return a;
  },
};
const b = a.b;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = $dotCall( b, a, "b" );
  const e = d.c;
  const f = e == null;
  if (f) {
    $( undefined );
  }
  else {
    const g = $dotCall( e, d, "c" );
    const h = g.d;
    $( h );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
    b() {
      debugger;
      return a$1;
    },
    c() {
      debugger;
      return a$1;
    },
    d() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpChainElementCall = a();
const tmpChainElementObject = tmpChainElementCall.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, `b`);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$3 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`);
    const tmpChainElementObject$3 = tmpChainElementCall$3.d;
    tmpCalleeParam = tmpChainElementObject$3;
    $(tmpChainElementObject$3);
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
