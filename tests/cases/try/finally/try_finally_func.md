# Preval test case

# try_finally_func.md

> Try > Finally > Try finally func
>
> Finally transform checks

## Input

`````js filename=intro
try {
  
} finally {
  function f() {
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x); // can see 1 2
    }
  }
  $(f);
}
`````


## Settled


`````js filename=intro
const f /*:()=>primitive*/ = function () {
  debugger;
  let x /*:number*/ /*truthy*/ = 1;
  let $finalStep /*:boolean*/ = false;
  let $finalArg /*:primitive*/ = undefined;
  try {
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      x = 2;
      $finalStep = true;
      $finalArg = 100;
    } else {
    }
  } catch ($finalImplicit) {
    $(x);
    throw $finalImplicit;
  }
  $(x);
  if ($finalStep) {
    return $finalArg;
  } else {
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  let x = 1;
  let $finalStep = false;
  let $finalArg = undefined;
  try {
    if ($()) {
      x = 2;
      $finalStep = true;
      $finalArg = 100;
    }
  } catch ($finalImplicit) {
    $(x);
    throw $finalImplicit;
  }
  $(x);
  if ($finalStep) {
    return $finalArg;
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  let c = false;
  let d = undefined;
  try {
    const e = $();
    if (e) {
      b = 2;
      c = true;
      d = 100;
    }
  }
  catch (f) {
    $( b );
    throw f;
  }
  $( b );
  if (c) {
    return d;
  }
  else {
    return undefined;
  }
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow$1 = false;
let $finalCatchArg$1 = undefined;
let f = function () {
  debugger;
  let x = 1;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      const tmpIfTest = $();
      if (tmpIfTest) {
        x = 2;
        $finalStep = true;
        $finalArg = 100;
        break $finally;
      } else {
      }
    } catch ($finalImplicit) {
      $(x);
      throw $finalImplicit;
    }
  }
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      return $finalArg;
    } else {
      return undefined;
    }
  }
};
$(f);
if ($implicitThrow$1) {
  throw $finalCatchArg$1;
} else {
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


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
