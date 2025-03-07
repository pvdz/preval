# Preval test case

# base_continue_always.md

> Normalize > Loops > Base continue always
>
> A loop with an unconditional early continue

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $(++n);
    continue;
  }
  $('afterwards');
  return 100;
}
$(f());
`````

## Settled


`````js filename=intro
let n /*:number*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  n = n + 1;
  $(n);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let n = 0;
while (true) {
  n = n + 1;
  $(n);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    $continue: {
      {
        $(++n);
        break $continue;
      }
    }
  }
  $(`afterwards`);
  return 100;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    n = n + 1;
    let tmpCalleeParam = n;
    $(tmpCalleeParam);
  }
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = a + 1;
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
