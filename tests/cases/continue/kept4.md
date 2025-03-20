# Preval test case

# kept4.md

> Continue > Kept4
>
> Example of where continue is not eliminated

## Input

`````js filename=intro
function $continue() {
  if ($()) {
    if ($()) {
      $continue();
      return;
    }
  }
  if ($()) {
    return;
  }
  $continue();
  return;
}
$continue();
`````


## Settled


`````js filename=intro
const $continue /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $();
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 /*:unknown*/ = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
$continue();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const $continue = function () {
  if ($()) {
    if ($()) {
      $continue();
      return undefined;
    }
  }
  const tmpIfTest$3 = $();
  if (!tmpIfTest$3) {
    $continue();
  }
};
$continue();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  if (b) {
    const c = $();
    if (c) {
      a();
      return undefined;
    }
  }
  const d = $();
  if (d) {
    return undefined;
  }
  else {
    a();
    return undefined;
  }
};
a();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - 7: 
 - 8: 
 - 9: 
 - 10: 
 - 11: 
 - 12: 
 - 13: 
 - 14: 
 - 15: 
 - 16: 
 - 17: 
 - 18: 
 - 19: 
 - 20: 
 - 21: 
 - 22: 
 - 23: 
 - 24: 
 - 25: 
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
