# Preval test case

# try_catch_ssa2.md

> Try > Try catch ssa2
>
> Try base cases

## Input

`````js filename=intro
{
  let ignore = false;
  function one($$1) {
    $(x);
    x = $(2);
    ignore = true;
    three(x);
  }
  function two(x, e) {
    $(x);
    x = $(3);
  }
  function three(x) {
    $(x);
  }

  let x = $(1);
  try {
    x = one(x);
  } catch (e) {
    if (ignore) throw e;
    x = two(x);
  }
  three(x);
  
  $tryCatch(one, two, three);
  
  function $tryCatch(a, b, c) {
    const [fail, ...args] = a();
    if (fail) {
      b(...args);
    } else {
      c(...args);
    }
  }
  
  
}
`````

## Settled


`````js filename=intro
let ignore /*:boolean*/ = false;
const one /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  x = $(2);
  ignore = true;
  $(x);
  return undefined;
};
let x /*:unknown*/ = $(1);
try {
  one();
  x = undefined;
} catch (e$1) {
  if (ignore) {
    throw e$1;
  } else {
    $(x);
    $(3);
    x = undefined;
  }
}
$(x);
one();
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let ignore = false;
const one = function () {
  $(x);
  x = $(2);
  ignore = true;
  $(x);
};
let x = $(1);
try {
  one();
  x = undefined;
} catch (e$1) {
  if (ignore) {
    throw e$1;
  } else {
    $(x);
    $(3);
    x = undefined;
  }
}
$(x);
one();
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
{
  let one = function ($$0) {
    let $dlr_$$1 = $$0;
    debugger;
    $(x);
    x = $(2);
    ignore = true;
    three(x);
  };
  let two = function ($$0, $$1) {
    let x$1 = $$0;
    let e = $$1;
    debugger;
    $(x$1);
    x$1 = $(3);
  };
  let three = function ($$0) {
    let x$3 = $$0;
    debugger;
    $(x$3);
  };
  let $tryCatch = function ($$0, $$1, $$2) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    debugger;
    const [fail, ...args] = a();
    if (fail) {
      b(...args);
    } else {
      c(...args);
    }
  };
  let ignore = false;
  let x = $(1);
  try {
    x = one(x);
  } catch (e$1) {
    if (ignore) throw e$1;
    x = two(x);
  }
  three(x);
  $tryCatch(one, two, three);
}
`````

## Normalized


`````js filename=intro
let one = function ($$0) {
  let $dlr_$$1 = $$0;
  debugger;
  $(x);
  x = $(2);
  ignore = true;
  three(x);
  return undefined;
};
let two = function ($$0, $$1) {
  let x$1 = $$0;
  let e = $$1;
  debugger;
  $(x$1);
  x$1 = $(3);
  return undefined;
};
let three = function ($$0) {
  let x$3 = $$0;
  debugger;
  $(x$3);
  return undefined;
};
let $tryCatch = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const bindingPatternArrRoot = a();
  const arrPatternSplat = [...bindingPatternArrRoot];
  const fail = arrPatternSplat[0];
  const args = arrPatternSplat.slice(1);
  if (fail) {
    b(...args);
    return undefined;
  } else {
    c(...args);
    return undefined;
  }
};
let ignore = false;
let x = $(1);
try {
  x = one(x);
} catch (e$1) {
  if (ignore) {
    throw e$1;
  } else {
    x = two(x);
  }
}
three(x);
$tryCatch(one, two, three);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = false;
const b = function() {
  debugger;
  $( c );
  c = $( 2 );
  a = true;
  $( c );
  return undefined;
};
let c = $( 1 );
try {
  b();
  c = undefined;
}
catch (d) {
  if (a) {
    throw d;
  }
  else {
    $( c );
    $( 3 );
    c = undefined;
  }
}
$( c );
b();
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: undefined
 - 7: 2
 - 8: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
