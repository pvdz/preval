# Preval test case

# mutated_push_try.md

> Arr mutation > Mutated push try
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
try {
  $(1);
  arr.splice(1, 2);
} catch {
  
}
arr.push('a', 'b');
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
try {
  $(1);
  arr.splice(1, 2);
} catch (e) {}
arr.push(`a`, `b`);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
try {
  $(1);
  arr.splice(1, 2);
} catch (e) {}
arr.push(`a`, `b`);
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
try {
  $( 1 );
  a.splice( 1, 2 );
}
catch (b) {

}
a.push( "a", "b" );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [1, 4, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
