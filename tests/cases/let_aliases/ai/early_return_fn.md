# Preval test case

# early_return_fn.md

> Let aliases > Ai > Early return fn
>
> Aliasing with early return in function (should not alias if mutation can occur before b)

## Input

`````js filename=intro
function test(flag) {
  let x = $("val");
  const a = x;
  if (flag) return;
  x = "changed";
  const b = x;
  $(a, b);
}
test(false);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let flag = $$0;
  debugger;
  let x = $(`val`);
  const a = x;
  if (flag) {
    return undefined;
  } else {
    x = `changed`;
    const b = x;
    $(a, x);
    return undefined;
  }
};
test(false);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
