# Preval test case

# unknown_assign_inv_true.md

> If test folding > Unknown assign inv true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(1);
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  $(`block`);
  $(`block`);
  const tmpIfTestFold /*:boolean*/ = Boolean(x);
  return tmpIfTestFold;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $(1);
  $(`block`);
  $(`block`);
  const tmpIfTestFold = Boolean(x);
  return tmpIfTestFold;
};
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( "block" );
  $( "block" );
  const c = Boolean( b );
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
 - 1: 1
 - 2: 'block'
 - 3: 'block'
 - 4: 1
 - 5: 'block'
 - 6: 'block'
 - 7: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
