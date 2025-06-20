# Preval test case

# the_case.md

> Assign hoisting > The case
>
> Abstraction of a real world pattern that I was trying to solve with this transform

## Input

`````js filename=intro
function f(func) {
  // I want a,b,c to be turned into constants but they are blocked by the functions referring to them.
  let a = undefined;
  let b = undefined
  let c = undefined;
  const f = function(){ 
    if ($) $(a);
  }
  const g = function(){ 
    if ($) $(b);
  }
  const h = function(){ 
    if ($) $(c);
  }
  a = func(1);
  b = func(2);
  c = func(3);
  if ($) {
    f();
    g();
    h();
    return [a, b, c];
  }
}

if ($) $(f($));
`````


## Settled


`````js filename=intro
if ($) {
  const a /*:unknown*/ = $(1);
  const tmpClusterSSA_b /*:unknown*/ = $(2);
  const tmpClusterSSA_c /*:unknown*/ = $(3);
  if ($) {
    $(a);
    if ($) {
      $(tmpClusterSSA_b);
      if ($) {
        $(tmpClusterSSA_c);
      } else {
      }
    } else {
    }
    const tmpClusterSSA_tmpCalleeParam /*:array*/ /*truthy*/ = [a, tmpClusterSSA_b, tmpClusterSSA_c];
    $(tmpClusterSSA_tmpCalleeParam);
  } else {
    $(undefined);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const a = $(1);
  const tmpClusterSSA_b = $(2);
  const tmpClusterSSA_c = $(3);
  if ($) {
    $(a);
    if ($) {
      $(tmpClusterSSA_b);
      if ($) {
        $(tmpClusterSSA_c);
      }
    }
    $([a, tmpClusterSSA_b, tmpClusterSSA_c]);
  } else {
    $(undefined);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  const b = $( 2 );
  const c = $( 3 );
  if ($) {
    $( a );
    if ($) {
      $( b );
      if ($) {
        $( c );
      }
    }
    const d = [ a, b, c ];
    $( d );
  }
  else {
    $( undefined );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let func = $$0;
  debugger;
  let a = undefined;
  let b = undefined;
  let c = undefined;
  const f$1 = function () {
    debugger;
    if ($) {
      $(a);
      return undefined;
    } else {
      return undefined;
    }
  };
  const g = function () {
    debugger;
    if ($) {
      $(b);
      return undefined;
    } else {
      return undefined;
    }
  };
  const h = function () {
    debugger;
    if ($) {
      $(c);
      return undefined;
    } else {
      return undefined;
    }
  };
  a = func(1);
  b = func(2);
  c = func(3);
  if ($) {
    f$1();
    g();
    h();
    const tmpReturnArg = [a, b, c];
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
if ($) {
  let tmpCalleeParam = f($);
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 1
 - 5: 2
 - 6: 3
 - 7: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
