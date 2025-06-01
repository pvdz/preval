# Preval test case

# recursive_fn_mutation.md

> Let aliases > Ai > Recursive fn mutation
>
> Mutation in a recursively called function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function mutate(n) { if (n > 0) { x = "changed"; mutate(n - 1); } }
mutate(1);
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const mutate /*:(number)=>undefined*/ = function ($$0) {
  const n /*:number*/ = $$0;
  debugger;
  const tmpIfTest /*:boolean*/ = n > 0;
  if (tmpIfTest) {
    x = `changed`;
    const tmpCalleeParam /*:number*/ = n - 1;
    mutate(tmpCalleeParam);
    return undefined;
  } else {
    return undefined;
  }
};
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
mutate(1);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const mutate = function (n) {
  if (n > 0) {
    x = `changed`;
    mutate(n - 1);
  }
};
let x = $(`val`);
const a = x;
mutate(1);
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b > 0;
  if (c) {
    d = "changed";
    const e = b - 1;
    a( e );
    return undefined;
  }
  else {
    return undefined;
  }
};
let d = $( "val" );
const f = d;
a( 1 );
$( f, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let mutate = function ($$0) {
  let n = $$0;
  debugger;
  const tmpIfTest = n > 0;
  if (tmpIfTest) {
    x = `changed`;
    const tmpCallCallee = mutate;
    let tmpCalleeParam = n - 1;
    mutate(tmpCalleeParam);
    return undefined;
  } else {
    return undefined;
  }
};
let x = $(`val`);
const a = x;
mutate(1);
const b = x;
$(a, x);
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
