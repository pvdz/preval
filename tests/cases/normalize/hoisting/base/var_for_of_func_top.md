# Preval test case

# var_for_of_func_top.md

> Normalize > Hoisting > Base > Var for of func top
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  for (var x of [100]) $(x, 'for');
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpCalleeParam /*:array*/ /*truthy*/ = [100];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    x = tmpForOfNext.value;
    $(x, `for`);
  }
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
$(undefined);
const tmpForOfGen = $forOf([100]);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    x = tmpForOfNext.value;
    $(x, `for`);
  }
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( undefined );
const b = [ 100 ];
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    a = d.value;
    $( a, "for" );
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(undefined);
  let tmpCalleeParam = [100];
  const tmpForOfGen = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGen();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      x = tmpForOfNext.value;
      $(x, `for`);
    }
  }
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
