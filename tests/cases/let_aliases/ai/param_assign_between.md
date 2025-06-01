# Preval test case

# param_assign_between.md

> Let aliases > Ai > Param assign between
>
> Assignment to a function parameter between aliases (should alias)

## Input

`````js filename=intro
function test(x) {
  const a = x;
  x = "other";
  const b = x;
  $(a, b);
}
test($("val"));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `other`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `other`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "other" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let x = $$0;
  debugger;
  const a = x;
  x = `other`;
  const b = x;
  $(a, x);
  return undefined;
};
const tmpCallCallee = test;
let tmpCalleeParam = $(`val`);
test(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'other'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
