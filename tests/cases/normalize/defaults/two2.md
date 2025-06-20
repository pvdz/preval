# Preval test case

# two2.md

> Normalize > Defaults > Two2
>
> Rewrite function param defaults to equivalent body code

Regression was accidentally dropping functions when the outer function was cloned.

The double references are probably to prevent inlining them outright. Same for the [x] bit. At the time of writing, anyways.

The problem was that outer was being cloned with a primitive. This clone was declared, called, and its call subsequently eliminated. Then another call to this function was being inlined with the same primitive. It used the cloning cache and assumed the function existed. But since that's not checked, the process was compiling a function call to a function taht no longer existed.

## Input

`````js filename=intro
const outer = function (x) {
  const r = [x];
  $(r);
};
let main = function () {
  const inner = function (x) {
    outer();
    if ($) {
      outer(x);
    }
  };

  inner();
  if ($) {
    inner();
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const outer /*:()=>unknown*/ = function () {
  debugger;
  const r /*:array*/ /*truthy*/ = [undefined];
  $(r);
  return undefined;
};
const inner /*:()=>unknown*/ = function () {
  debugger;
  outer();
  if ($) {
    outer();
    return undefined;
  } else {
    return undefined;
  }
};
inner();
if ($) {
  inner();
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const outer = function () {
  $([undefined]);
};
const inner = function () {
  outer();
  if ($) {
    outer();
  }
};
inner();
if ($) {
  inner();
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ undefined ];
  $( b );
  return undefined;
};
const c = function() {
  debugger;
  a();
  if ($) {
    a();
    return undefined;
  }
  else {
    return undefined;
  }
};
c();
if ($) {
  c();
  $( undefined );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const outer = function ($$0) {
  let x = $$0;
  debugger;
  const r = [x];
  $(r);
  return undefined;
};
let main = function () {
  debugger;
  const inner = function ($$0) {
    let x$1 = $$0;
    debugger;
    outer();
    if ($) {
      outer(x$1);
      return undefined;
    } else {
      return undefined;
    }
  };
  inner();
  if ($) {
    inner();
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [undefined]
 - 2: [undefined]
 - 3: [undefined]
 - 4: [undefined]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
