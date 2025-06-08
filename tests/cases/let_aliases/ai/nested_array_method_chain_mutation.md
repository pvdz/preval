# Preval test case

# nested_array_method_chain_mutation.md

> Let aliases > Ai > Nested array method chain mutation
>
> Mutation in a nested array method chain (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
[1, 2].filter(() => true).forEach(() => { x = "changed"; });
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpMCP /*:()=>boolean*/ = function () {
  debugger;
  return true;
};
const tmpMCOO$1 /*:array*/ /*truthy*/ = [1, 2];
const tmpMCOO /*:array*/ /*truthy*/ = $dotCall($array_filter, tmpMCOO$1, `filter`, tmpMCP);
const tmpMCP$1 /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
$dotCall($array_forEach, tmpMCOO, `forEach`, tmpMCP$1);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCP = function () {
  return true;
};
$dotCall($array_forEach, $dotCall($array_filter, [1, 2], `filter`, tmpMCP), `forEach`, function () {
  x = `changed`;
});
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = function() {
  debugger;
  return true;
};
const d = [ 1, 2 ];
const e = $dotCall( $array_filter, d, "filter", c );
const f = function() {
  debugger;
  a = "changed";
  return undefined;
};
$dotCall( $array_forEach, e, "forEach", f );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCOO$1 = [1, 2];
const tmpMCF = tmpMCOO$1.filter;
const tmpMCP = function () {
  debugger;
  return true;
};
const tmpMCOO = $dotCall(tmpMCF, tmpMCOO$1, `filter`, tmpMCP);
const tmpMCF$1 = tmpMCOO.forEach;
const tmpMCP$1 = function () {
  debugger;
  x = `changed`;
  return undefined;
};
$dotCall(tmpMCF$1, tmpMCOO, `forEach`, tmpMCP$1);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_forEach
- (todo) arr mutation may be able to inline this method: $array_filter
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_filter
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
