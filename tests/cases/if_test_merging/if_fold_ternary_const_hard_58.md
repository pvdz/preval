# Preval test case

# if_fold_ternary_const_hard_58.md

> If test merging > If fold ternary const hard 58
>
> Hard Case 58: NO CHANGE - return in then before y assignment

## Input

`````js filename=intro
function test() {
  let x = $(true);
  let y = !x; // x=T,y=F; x=F,y=T

  if (x) {
    // x is true, y was false.
    if ($(true)) return $('EARLY_EXIT'); // Control flow change
    y = true; // This might not be reached.
  } else {
    // x is false, y was true. Not reassigned.
  }

  // y's state in `then` path is uncertain.
  if (y) {
    $('THEN');
  } else {
    $('ELSE');
  }
}

/* Expected output (NO CHANGE by this rule for if(y)):
function test() {
  let x = $(true);
  let y = !x;
  if (x) {
    if ($(true)) return $('EARLY_EXIT');
    y = true;
  } else {}
  if (y) {
    $('THEN');
  } else {
    $('ELSE');
  }
}
*/
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function () {
  debugger;
  let x = $(true);
  let y = !x;
  if (x) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpReturnArg = $(`EARLY_EXIT`);
      return tmpReturnArg;
    } else {
      y = true;
    }
  } else {
  }
  if (y) {
    $(`THEN`);
    return undefined;
  } else {
    $(`ELSE`);
    return undefined;
  }
};
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
