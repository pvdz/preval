# Preval test case

# try_catch_ssa.md

> Try > Try catch ssa
>
> Try base cases

#TODO

## Input

`````js filename=intro
let x = $(1);
try {
  $(x);
  x = $(2);
} catch (e) {
  $(x);
  x = $(3);
}
$(x);







// SSA
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

## Pre Normal

`````js filename=intro
let x = $(1);
try {
  $(x);
  x = $(2);
} catch (e) {
  $(x);
  x = $(3);
}
$(x);
{
  let one = function ($$0) {
    let $dlr_$$1 = $$0;
    debugger;
    $(x$1);
    x$1 = $(2);
    ignore = true;
    three(x$1);
  };
  let two = function ($$0, $$1) {
    let x$3 = $$0;
    let e$1 = $$1;
    debugger;
    $(x$3);
    x$3 = $(3);
  };
  let three = function ($$0) {
    let x$5 = $$0;
    debugger;
    $(x$5);
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
  let x$1 = $(1);
  try {
    x$1 = one(x$1);
  } catch (e$3) {
    if (ignore) throw e$3;
    x$1 = two(x$1);
  }
  three(x$1);
  $tryCatch(one, two, three);
}
`````

## Normalized

`````js filename=intro
let x = $(1);
try {
  $(x);
  x = $(2);
} catch (e) {
  $(x);
  x = $(3);
}
$(x);
let one = function ($$0) {
  let $dlr_$$1 = $$0;
  debugger;
  $(x$1);
  x$1 = $(2);
  ignore = true;
  three(x$1);
  return undefined;
};
let two = function ($$0, $$1) {
  let x$3 = $$0;
  let e$1 = $$1;
  debugger;
  $(x$3);
  x$3 = $(3);
  return undefined;
};
let three = function ($$0) {
  let x$5 = $$0;
  debugger;
  $(x$5);
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
let x$1 = $(1);
try {
  x$1 = one(x$1);
} catch (e$3) {
  if (ignore) {
    throw e$3;
  } else {
    x$1 = two(x$1);
  }
}
three(x$1);
$tryCatch(one, two, three);
`````

## Output

`````js filename=intro
let x = $(1);
try {
  $(x);
  x = $(2);
} catch (e) {
  $(x);
  x = $(3);
}
$(x);
let ignore = false;
const one = function () {
  debugger;
  $(x$1);
  x$1 = $(2);
  ignore = true;
  $(x$1);
  return undefined;
};
let x$1 = $(1);
try {
  one();
  x$1 = undefined;
} catch (e$3) {
  if (ignore) {
    throw e$3;
  } else {
    $(x$1);
    $(3);
    x$1 = undefined;
  }
}
$(x$1);
one();
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
try {
  $( a );
  a = $( 2 );
}
catch (b) {
  $( a );
  a = $( 3 );
}
$( a );
let c = false;
const d = function() {
  debugger;
  $( e );
  e = $( 2 );
  c = true;
  $( e );
  return undefined;
};
let e = $( 1 );
try {
  d();
  e = undefined;
}
catch (f) {
  if (c) {
    throw f;
  }
  else {
    $( e );
    $( 3 );
    e = undefined;
  }
}
$( e );
d();
[ ... undefined ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: undefined
 - 10: undefined
 - 11: 2
 - 12: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
