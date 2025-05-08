# Preval test case

# base.md

> Unwind loops > Counter test > Base
>
> todo

## Input

`````js filename=intro
let counter = 5;
while (counter) {
  $('x' + counter)
  counter = counter - 1;
}
$('finished');
`````


## Settled


`````js filename=intro
$(`x5`);
$(`x4`);
$(`x3`);
$(`x2`);
$(`x1`);
$(`finished`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x5`);
$(`x4`);
$(`x3`);
$(`x2`);
$(`x1`);
$(`finished`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x5" );
$( "x4" );
$( "x3" );
$( "x2" );
$( "x1" );
$( "finished" );
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this node type in isFree: TemplateLiteral
- (todo) maybe we can inline a primitive into a frfr that is called multiple times, too?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x5'
 - 2: 'x4'
 - 3: 'x3'
 - 4: 'x2'
 - 5: 'x1'
 - 6: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
