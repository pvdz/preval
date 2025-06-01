# Preval test case

# ai_func_multi_cond_return.md

> Ai > Ai1 > Ai func multi cond return
>
> Test: Function with multiple conditional returns, called immediately.

## Input

`````js filename=intro
// Expected: (Function inlined, r gets correct value from conditional path)
function foo() {
  if ($('C1')) return $('R1');
  if ($('C2')) return $('R2');
  return $('R3');
}
let r = foo();
$('use', r);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`C1`);
if (tmpIfTest) {
  const tmpClusterSSA_r /*:unknown*/ = $(`R1`);
  $(`use`, tmpClusterSSA_r);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(`C2`);
  if (tmpIfTest$1) {
    const tmpClusterSSA_r$1 /*:unknown*/ = $(`R2`);
    $(`use`, tmpClusterSSA_r$1);
  } else {
    const tmpClusterSSA_r$3 /*:unknown*/ = $(`R3`);
    $(`use`, tmpClusterSSA_r$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`C1`)) {
  $(`use`, $(`R1`));
} else {
  if ($(`C2`)) {
    $(`use`, $(`R2`));
  } else {
    $(`use`, $(`R3`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "C1" );
if (a) {
  const b = $( "R1" );
  $( "use", b );
}
else {
  const c = $( "C2" );
  if (c) {
    const d = $( "R2" );
    $( "use", d );
  }
  else {
    const e = $( "R3" );
    $( "use", e );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function () {
  debugger;
  const tmpIfTest = $(`C1`);
  if (tmpIfTest) {
    const tmpReturnArg = $(`R1`);
    return tmpReturnArg;
  } else {
    const tmpIfTest$1 = $(`C2`);
    if (tmpIfTest$1) {
      const tmpReturnArg$1 = $(`R2`);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = $(`R3`);
      return tmpReturnArg$3;
    }
  }
};
let r = foo();
$(`use`, r);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C1'
 - 2: 'R1'
 - 3: 'use', 'R1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
