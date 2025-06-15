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


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_forEach
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
