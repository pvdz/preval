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
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpReturnArg /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1];
$dotCall($array_forEach, tmpMCOO, `forEach`, tmpReturnArg);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpReturnArg = function () {
  x = `changed`;
};
$dotCall($array_forEach, [1], `forEach`, tmpReturnArg);
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


- (todo) arr mutation may be able to inline this method: $array_forEach
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
