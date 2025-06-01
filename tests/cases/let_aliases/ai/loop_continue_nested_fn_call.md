# Preval test case

# loop_continue_nested_fn_call.md

> Let aliases > Ai > Loop continue nested fn call
>
> Mutation in a loop with continue and nested function call (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 3; i++) {
  if (i === 0) continue;
  (function() { x = "changed"; })();
  break;
}
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
let i = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        break $continue;
      } else {
        const tmpCallComplexCallee = function () {
          debugger;
          x = `changed`;
          return undefined;
        };
        tmpCallComplexCallee();
        break;
      }
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


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
