# Preval test case

# try_catch_ssa.md

> Try > Try catch ssa
>
> Try base cases

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







//// SSA
//{
//  let ignore = false;
//  function one($$1) {
//    $(x);
//    x = $(2);
//    ignore = true;
//    three(x);
//  }
//  function two(x, e) {
//    $(x);
//    x = $(3);
//  }
//  function three(x) {
//    $(x);
//  }
//
//  let x = $(1);
//  try {
//    x = one(x);
//  } catch (e) {
//    if (ignore) throw e;
//    x = two(x);
//  }
//  three(x);
//  
//  $tryCatch(one, two, three);
//  
//  function $tryCatch(a, b, c) {
//    const [fail, ...args] = a();
//    if (fail) {
//      b(...args);
//    } else {
//      c(...args);
//    }
//  }
//}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(1);
try {
  $(x);
  x = $(2);
} catch (e) {
  $(x);
  x = $(3);
}
$(x);
`````


## Denormalized
(This ought to be the final result)

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
`````


## PST Settled
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
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
