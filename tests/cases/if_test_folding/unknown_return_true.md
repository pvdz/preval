# Preval test case

# unknown_return_true.md

> If test folding > Unknown return true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(1);
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
}
f();
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpBoolTrampoline /*:unknown*/ = $(1);
const tmpBoolTrampolineB /*:boolean*/ = !tmpBoolTrampoline;
$(tmpBoolTrampolineB);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpBoolTrampoline = $(1);
$(!tmpBoolTrampoline);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = !a;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
