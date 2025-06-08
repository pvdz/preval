# Preval test case

# destructuring_rest_param_fn.md

> Let aliases > Ai > Destructuring rest param fn
>
> Destructuring and rest in function parameter (should not alias if x is mutated)

## Input

`````js filename=intro
function test(...args) {
  let x = $("val");
  const a = x;
  [1].forEach(() => { x = "changed"; });
  const b = x;
  $(a, b);
}
test(1, 2, 3);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpMCP /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1];
$dotCall($array_forEach, tmpMCOO, `forEach`, tmpMCP);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCP = function () {
  x = `changed`;
};
$dotCall($array_forEach, [1], `forEach`, tmpMCP);
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = function() {
  debugger;
  a = "changed";
  return undefined;
};
const d = [ 1 ];
$dotCall( $array_forEach, d, "forEach", c );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function (...$$0 /*:array*/) {
  let args = $$0;
  debugger;
  let x = $(`val`);
  const a = x;
  const tmpMCOO = [1];
  const tmpMCF = tmpMCOO.forEach;
  const tmpMCP = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  $dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
  const b = x;
  $(a, x);
  return undefined;
};
test(1, 2, 3);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
