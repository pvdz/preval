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
let tmpCalleeParam /*:unknown*/ = undefined;
const a$1 /*:object*/ = {
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
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, a$1, `b`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.c;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$3 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`);
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$3.d;
    tmpCalleeParam = tmpChainElementObject$3;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
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
if (!(tmpChainElementObject == null)) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, a$1, `b`);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  if (!(tmpChainElementObject$1 == null)) {
    tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`).d;
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


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
$(a().b?.().c?.().d);
`````

## Normalized


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
const tmpChainElementCall = tmpChainRootCall();
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
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a(  ) {
    debugger;
    return b;
  },
  b(  ) {
    debugger;
    return b;
  },
  c(  ) {
    debugger;
    return b;
  },
  d(  ) {
    debugger;
    return b;
  },
};
const c = b.b;
const d = c == null;
if (d) {

}
else {
  const e = $dotCall( c, b, "b" );
  const f = e.c;
  const g = f == null;
  if (g) {

  }
  else {
    const h = $dotCall( f, e, "c" );
    const i = h.d;
    a = i;
  }
}
$( a );
`````

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
