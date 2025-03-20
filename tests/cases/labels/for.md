# Preval test case

# for.md

> Labels > For
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

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
