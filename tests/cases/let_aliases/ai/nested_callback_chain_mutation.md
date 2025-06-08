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
const tmpMCP$1 /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpMCP /*:()=>undefined*/ = function () {
  debugger;
  const tmpMCOO$1 /*:array*/ /*truthy*/ = [2];
  $dotCall($array_forEach, tmpMCOO$1, `forEach`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1];
$dotCall($array_map, tmpMCOO, `map`, tmpMCP);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP$1 = function () {
  x = `changed`;
};
let x = $(`val`);
const a = x;
const tmpMCP = function () {
  $dotCall($array_forEach, [2], `forEach`, tmpMCP$1);
};
$dotCall($array_map, [1], `map`, tmpMCP);
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = "changed";
  return undefined;
};
let b = $( "val" );
const c = b;
const d = function() {
  debugger;
  const e = [ 2 ];
  $dotCall( $array_forEach, e, "forEach", a );
  return undefined;
};
const f = [ 1 ];
$dotCall( $array_map, f, "map", d );
$( c, b );
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


- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type ExpressionStatement
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
