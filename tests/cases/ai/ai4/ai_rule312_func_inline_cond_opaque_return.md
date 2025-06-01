# Preval test case

# ai_rule312_func_inline_cond_opaque_return.md

> Ai > Ai4 > Ai rule312 func inline cond opaque return
>
> Test: Function inlining with conditional opaque return.

## Input

`````js filename=intro
// Expected: $('call1_val'); $('call2_is_10', 10);
function foo(input) {
  if (input > 5) {
    return $('val');
  } else {
    return 10;
  }
}
let result1 = foo(100);
$('call1_val', result1);
let result2 = foo(0);
$('call2_is_10', result2);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_result1 /*:unknown*/ = $(`val`);
$(`call1_val`, tmpClusterSSA_result1);
$(`call2_is_10`, 10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`call1_val`, $(`val`));
$(`call2_is_10`, 10);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( "call1_val", a );
$( "call2_is_10", 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function ($$0) {
  let input = $$0;
  debugger;
  const tmpIfTest = input > 5;
  if (tmpIfTest) {
    const tmpReturnArg = $(`val`);
    return tmpReturnArg;
  } else {
    return 10;
  }
};
let result1 = foo(100);
$(`call1_val`, result1);
let result2 = foo(0);
$(`call2_is_10`, result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'call1_val', 'val'
 - 3: 'call2_is_10', 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
