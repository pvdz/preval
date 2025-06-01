# Preval test case

# nested_try_catch_finally_mutation.md

> Let aliases > Ai > Nested try catch finally mutation
>
> Nested try/catch/finally with mutation (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  try {
    x = "inner";
  } catch (e) {
    x = "catch";
  } finally {
    x = "finally";
  }
} catch (e) {}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `finally`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `finally`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "finally" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    x = `inner`;
  } catch (e) {
    try {
      x = `catch`;
    } catch ($finalImplicit) {
      x = `finally`;
      throw $finalImplicit;
    }
  }
  x = `finally`;
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
  }
} catch (e$1) {}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
