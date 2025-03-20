# Preval test case

# mutated_push_closure.md

> Arr mutation > Mutated push closure
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
f();
arr.push('a', 'b');
$(arr);
function f() {
  arr.splice(1, 5); // If a and b are added before the splice then a will be removed
}
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
arr.splice(1, 5);
arr.push(`a`, `b`);
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 5);
arr.push(`a`, `b`);
$(arr);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  arr.splice(1, 5);
};
const arr = [1, 2, 3, 4];
f();
arr.push(`a`, `b`);
$(arr);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  arr.splice(1, 5);
  return undefined;
};
const arr = [1, 2, 3, 4];
f();
arr.push(`a`, `b`);
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
a.splice( 1, 5 );
a.push( "a", "b" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- processArrayWriteReadImmutableBinding slow path
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_splice
