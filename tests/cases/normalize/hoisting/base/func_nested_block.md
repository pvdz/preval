# Preval test case

# func_nested_block.md

> Normalize > Hoisting > Base > Func nested block
>
> Function declarations in a block are not hoisted

## Input

`````js filename=intro
function g() {
  {
    let x = 100;  
    function f() {
      return x;
    }
    $(f());
  }
}
g();
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return x;
  };
  let x = 100;
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
  return undefined;
};
g();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
