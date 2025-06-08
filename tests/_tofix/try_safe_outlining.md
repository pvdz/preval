# Preval test case

# try_safe_outlining.md

> Tofix > try safe outlining

This is from an existing ref test but create a new one for the point:
- when a try-block ends with assignment of a trivially safe value then
  the assignment can be moved to appear after the try/catch (there can not
  be a finally anymore, making this a safe transform). This will improve
  ref tracking and probably catch some more cases of noop try/catch.
- this applies to any safe noop statement in try-block tail position.

## Input

`````js filename=intro
let x = 1;
try {
  $(x);         // x=1
  x = 2;
} catch (e) {
  $(x);         // x=1 (2) (x can only not be 2 if something throws after hte assignment completes, which I think is impossible, but we'll fix that later)
  if ($()) {
    x = 3;
  }
} finally {
  $(x);         // x=1 2 3 
  if ($()) {
    x = 4;
  }
}
$(x);           // x=1 2 3 4
`````


## Settled


`````js filename=intro
let x /*:number*/ /*truthy*/ = 1;
let $implicitThrow /*:boolean*/ = false;
let $finalCatchArg /*:unknown*/ = undefined;
try {
  $(1);
  x = 2;
} catch (e) {
  try {
    $(x);
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      x = 3;
    } else {
    }
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
$(x);
const tmpIfTest$1 /*:unknown*/ = $();
if (tmpIfTest$1) {
  x = 4;
} else {
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  x = 2;
} catch (e) {
  try {
    $(x);
    if ($()) {
      x = 3;
    }
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
$(x);
if ($()) {
  x = 4;
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = false;
let c = undefined;
try {
  $( 1 );
  a = 2;
}
catch (d) {
  try {
    $( a );
    const e = $();
    if (e) {
      a = 3;
    }
  }
  catch (f) {
    b = true;
    c = f;
  }
}
$( a );
const g = $();
if (g) {
  a = 4;
}
if (b) {
  throw c;
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(x);
  x = 2;
} catch (e) {
  try {
    $(x);
    const tmpIfTest = $();
    if (tmpIfTest) {
      x = 3;
    } else {
    }
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
$(x);
const tmpIfTest$1 = $();
if (tmpIfTest$1) {
  x = 4;
} else {
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
