# Preval test case

# try_catch_ssa3.md

> Try > Try catch ssa3
>
> Try base cases

This exposed a problem when the $throw() throws an error
and the catch is triggered with ignore=true. At some point
the whole `ignore` variable was eliminated, which is wrong.

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
    $throw(x);
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
  $throw(x);
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
$throw(x);
one();
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...undefined];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let ignore = false;
const one = function () {
  $(x);
  x = $(2);
  ignore = true;
  $throw(x);
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
$throw(x);
one();
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpArrPatternSplat = [...undefined];\`)`;
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
  d( c );
  return undefined;
};
let c = $( 1 );
try {
  b();
  c = undefined;
}
catch (e) {
  if (a) {
    throw e;
  }
  else {
    $( c );
    $( 3 );
    c = undefined;
  }
}
d( c );
b();
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpArrPatternSplat = [...undefined];`)";
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: '$Throwing', 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
