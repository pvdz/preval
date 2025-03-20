# Preval test case

# label_registry.md

> Tofix > label registry
>
> Remove this file after fixing it but the label registry needs a fixup
> Why is the label still not eliminated here...?

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(0);
$(true);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(true);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( true );
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
