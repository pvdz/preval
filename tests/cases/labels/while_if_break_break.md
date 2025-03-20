# Preval test case

# while_if_break_break.md

> Labels > While if break break
>
>

## Input

`````js filename=intro
A: {
  while (true) {
    $();
    break A;
  }
  $('fail');
}
`````


## Settled


`````js filename=intro
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
