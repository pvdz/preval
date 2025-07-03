# Preval test case

# loop_in_callback_mutation.md

> Let aliases > Ai > Loop in callback mutation
>
> Mutation in a loop inside a callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
[1].forEach(() => {
  for (let i = 0; i < 1; i++) {
    x = "changed";
  }
});
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
const tmpMCOO = [1];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function () {
  debugger;
  let i = 0;
  while (true) {
    const tmpIfTest = i < 1;
    if (tmpIfTest) {
      x = `changed`;
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support non-primitive in first arg to $coerce
- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init BinaryExpression
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
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
