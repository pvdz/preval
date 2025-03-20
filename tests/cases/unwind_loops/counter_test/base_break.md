# Preval test case

# base_break.md

> Unwind loops > Counter test > Base break
>
> todo

## Input

`````js filename=intro
let counter = 5;
while (true) {
  counter = counter - 1;
  if (counter) {
    $('x')
  } else {
    break;
  }
}
$('finished');
`````


## Settled


`````js filename=intro
$(`x`);
$(`x`);
$(`x`);
$(`x`);
$(`finished`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
$(`x`);
$(`x`);
$(`x`);
$(`finished`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
$( "x" );
$( "x" );
$( "x" );
$( "finished" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'x'
 - 3: 'x'
 - 4: 'x'
 - 5: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
