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


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) do we want to support Literal as expression statement in free loops?
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
