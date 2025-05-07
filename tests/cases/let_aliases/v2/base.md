# Preval test case

# base.md

> Let aliases > V2 > Base
>
> Let aliasing is when a let var gets aliased, something else happens that may spy, and then 
> the alias is read even though the let could not have been changed by that time, yet.
> (v2 resolves this particular case)

## Input

`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (counter < 5) {
    const alias = counter;                  // <- redundant
    const chr = `abcdef`.charAt(counter);
    arr[alias] = chr;                       // <- arr[counter]
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `b`, `c`, `d`, `e`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e" ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type WhileStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b', 'c', 'd', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
