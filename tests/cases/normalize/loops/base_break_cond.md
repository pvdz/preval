# Preval test case

# base_break_cond.md

> Normalize > Loops > Base break cond
>
> A loop with a conditional early break

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $(++n);
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(`afterwards`);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`afterwards`);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "afterwards" );
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
