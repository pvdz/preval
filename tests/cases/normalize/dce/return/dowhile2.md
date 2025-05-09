# Preval test case

# dowhile2.md

> Normalize > Dce > Return > Dowhile2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
    $('fail');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1, `return`);
$(tmpCalleeParam);
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
