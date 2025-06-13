# Preval test case

# if_fold_ternary_const_hard_56.md

> If test merging > If fold ternary const hard 56
>
> Hard Case 56: NO CHANGE - y set in try, but catch/finally might change it or prevent set

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
let err_cond = $(false);

if (x) {
  // x is true, y was false.
  try {
    if (err_cond) throw new Error('problem');
    y = true;
  } catch (e) {
    y = false; // y could become false here
  } finally {
    // y = null; // Or even changed in finally
  }
} else {
  // x is false, y was true. Not reassigned.
}

// y's state is uncertain due to try/catch. Not consistently truthy.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
let err_cond = $(false);
if (x) {
  try {
    if (err_cond) throw new Error('problem');
    y = true;
  } catch (e) {
    y = false;
  } finally {}
} else {}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
let y /*:boolean*/ = !x;
const err_cond /*:unknown*/ = $(false);
if (x) {
  try {
    if (err_cond) {
      const tmpThrowArg /*:object*/ /*truthy*/ = new $error_constructor(`problem`);
      throw tmpThrowArg;
    } else {
      y = true;
    }
  } catch (e) {
    y = false;
  }
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
let y = !x;
const err_cond = $(false);
if (x) {
  try {
    if (err_cond) {
      const tmpThrowArg = new $error_constructor(`problem`);
      throw tmpThrowArg;
    } else {
      y = true;
    }
  } catch (e) {
    y = false;
  }
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
const c = $( false );
if (a) {
  try {
    if (c) {
      const d = new $error_constructor( "problem" );
      throw d;
    }
    else {
      b = true;
    }
  }
  catch (e) {
    b = false;
  }
}
if (b) {
  $( "THEN" );
}
else {
  $( "ELSE" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true);
let y = !x;
let err_cond = $(false);
if (x) {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    if (err_cond) {
      const tmpThrowArg = new $error_constructor(`problem`);
      throw tmpThrowArg;
    } else {
      y = true;
    }
  } catch (e) {
    try {
      y = false;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
  }
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
