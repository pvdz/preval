# Preval test case

# race.md

> Spyless vars > Race
>
> Assignments of all kinds should be normalized in all circumstances

Multiple vars racing competing for the same place.

## Input

`````js filename=intro
let y = 2
let z = [10, 20, 30];
let tmpSwitchCaseToStart = 1;
if ($('a') === $) tmpSwitchCaseToStart = 0;
$(a, z);
`````


## Settled


`````js filename=intro
$(`a`);
const z /*:array*/ = [10, 20, 30];
$(a, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(a, [10, 20, 30]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
const b = [ 10, 20, 30 ];
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = 2;
let z = [10, 20, 30];
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === $;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
  $(a, z);
} else {
  $(a, z);
}
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
