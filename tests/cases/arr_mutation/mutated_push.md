# Preval test case

# mutated_push.md

> Arr mutation > Mutated push
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push('a', 'b');
$(arr);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push(`a`, `b`);
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push(`a`, `b`);
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push(`a`, `b`);
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push(`a`, `b`);
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
a.splice( 1, 2 );
a.push( "a", "b" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 4, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_splice
