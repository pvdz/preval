# Preval test case

# redundant_continue_label.md

> Labels > Redundant continue label
>
> The label is redundant because the continue does not span more than one loop. So it may as well not have had the label.

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while (false);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
