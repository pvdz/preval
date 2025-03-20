# Preval test case

# write_to_loop_test_inside_loop.md

> Normalize > While > Write to loop test inside loop
>
> The inner assign should not be eliminated since the loop condition uses it

## Input

`````js filename=intro
let x = true;
while (x) {
  $('inside');
  x = false;
}
$(1);
`````


## Settled


`````js filename=intro
$(`inside`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inside`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inside" );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inside'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
