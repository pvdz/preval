# Preval test case

# for_in_of_regression.md

> Ssa > Single scope > For in of regression
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
let x /*:unknown*/ = undefined;
const list /*:array*/ = [100];
const tmpForOfGen /*:unknown*/ = $forOf(list);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_arr /*:unknown*/ = tmpForOfNext.value;
    x = tmpClusterSSA_arr;
    $(tmpClusterSSA_arr, `for`);
  }
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
let x = undefined;
const tmpForOfGen = $forOf([100]);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpClusterSSA_arr = tmpForOfNext.value;
    x = tmpClusterSSA_arr;
    $(tmpClusterSSA_arr, `for`);
  }
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
let a = undefined;
const b = [ 100 ];
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    a = f;
    $( f, "for" );
  }
}
$( a );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
