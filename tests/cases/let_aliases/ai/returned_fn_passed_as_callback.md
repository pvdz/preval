# Preval test case

# returned_fn_passed_as_callback.md

> Let aliases > Ai > Returned fn passed as callback
>
> Returned function passed as callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function makeMutator() {
  return function() { x = "changed"; };
}
[1].forEach(makeMutator());
const b = x;
$(a, b);
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
let makeMutator = function () {
  debugger;
  const tmpReturnArg = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  return tmpReturnArg;
};
let x = $(`val`);
const a = x;
const tmpMCOO = [1];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = makeMutator();
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
