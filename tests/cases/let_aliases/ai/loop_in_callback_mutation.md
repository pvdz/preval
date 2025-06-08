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


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) i need loopChain for this to work properly
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
