# Preval test case

# dowhile1.md

> Normalize > Dce > Return > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpSSA_tmpCalleeParam /*:unknown*/ = $(1, `return`);
$(tmpSSA_tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1, `return`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "return" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  }
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
