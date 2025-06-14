# Preval test case

# decl-read-closure.md

> Let hoisting > Decl-read-closure
>
> This case has a ref following the decl in the same scope

## Input

`````js filename=intro
function f() {
    let x = $;
    const g = function(){
      if ($) {
        x = $(2);
        $(x);
      }
    };
    if (x) {
      g();
    }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 2 );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $;
  const g = function () {
    debugger;
    if ($) {
      x = $(2);
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  if (x) {
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
