# Preval test case

# bool_return_true.md

> If test folding > Bool return true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(0) === 1;
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
const f /*:()=>boolean*/ = function () {
  debugger;
  const tmpBinLhs /*:unknown*/ = $(0);
  const x /*:boolean*/ = tmpBinLhs !== 1;
  return x;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $(0) !== 1;
  return x;
};
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 0 );
  const c = b !== 1;
  return c;
};
a();
const d = a();
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
