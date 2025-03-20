# Preval test case

# var_for_in_func_block.md

> Normalize > Hoisting > Base > Var for in func block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var x in {y: 100}) $(x, 'for');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpCalleeParam /*:object*/ = { y: 100 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    x = tmpForInNext.value;
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
const tmpForInGen = $forIn({ y: 100 });
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    x = tmpForInNext.value;
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
const b = { y: 100 };
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
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


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
