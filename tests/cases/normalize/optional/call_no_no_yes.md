# Preval test case

# call_no_no_yes.md

> Normalize > Optional > Call no no yes
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
$(a().b().c?.().d);
`````

## Settled


`````js filename=intro
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
const tmpChainElementCall$1 /*:unknown*/ = a$1.b();
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.c;
const tmpIfTest /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`);
  const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$3.d;
  $(tmpChainElementObject$3);
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
const tmpChainElementCall$1 = a$1.b();
const tmpChainElementObject$1 = tmpChainElementCall$1.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $($dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`).d);
}
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
$(a().b().c?.().d);
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
const tmpChainElementCall = a();
const tmpChainElementCall$1 = tmpChainElementCall.b();
const tmpChainElementObject$1 = tmpChainElementCall$1.c;
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementCall$3 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, `c`);
  const tmpChainElementObject$3 = tmpChainElementCall$3.d;
  tmpCalleeParam = tmpChainElementObject$3;
} else {
}
$(tmpCalleeParam);
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
const b = a.b();
const c = b.c;
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = $dotCall( c, b, "c" );
  const f = e.d;
  $( f );
}
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
