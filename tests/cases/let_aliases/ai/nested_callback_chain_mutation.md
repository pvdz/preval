# Preval test case

# nested_callback_chain_mutation.md

> Let aliases > Ai > Nested callback chain mutation
>
> Mutation in nested callback chain (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
[1].map(() => {
  [2].forEach(() => {
    x = "changed";
  });
});
const b = x;
$(a, b);
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
$dotCall($array_map, tmpMCOO, `map`, tmpMCP);
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
$dotCall($array_map, [1], `map`, tmpMCP);
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
$dotCall( $array_map, d, "map", c );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCOO = [1];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function () {
  debugger;
  const tmpMCOO$1 = [2];
  const tmpMCF$1 = tmpMCOO$1.forEach;
  const tmpMCP$1 = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  $dotCall(tmpMCF$1, tmpMCOO$1, `forEach`, tmpMCP$1);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) arr mutation may be able to inline this method: $array_map
- (todo) i need loopChain for this to work properly
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) type trackeed tricks can possibly support static $array_map


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
