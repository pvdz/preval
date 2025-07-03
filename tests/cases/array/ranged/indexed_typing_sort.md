# Preval test case

# indexed_typing_sort.md

> Array > Ranged > Indexed typing sort
>
>

## Input

`````js filename=intro
const arr = [
  `one`,
  `two`,
  `three`,
  `four`,
  `five`,
];
if ($(true)) { // Preval doesn't know order of array
  arr.sort(); // len does not change
}
const x = arr[0]; // Preval can't predict value but should now know it's a string (not primitive; it can deduce that the value is not undefined)
const y = x.slice(0, 2); // Since x is a string, slice can resolve to the builtin
$(y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
const arr /*:array*/ /*truthy*/ = [`one`, `two`, `three`, `four`, `five`];
if (tmpIfTest) {
  $dotCall($array_sort, arr, `sort`);
} else {
}
const x /*:string*/ = arr[0];
const y /*:string*/ = $dotCall($string_slice, x, `slice`, 0, 2);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(true);
const arr = [`one`, `two`, `three`, `four`, `five`];
if (tmpIfTest) {
  $dotCall($array_sort, arr, `sort`);
}
$($dotCall($string_slice, arr[0], `slice`, 0, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = [ "one", "two", "three", "four", "five" ];
if (a) {
  $dotCall( $array_sort, b, "sort" );
}
const c = b[ 0 ];
const d = $dotCall( $string_slice, c, "slice", 0, 2 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpMCF = arr.sort;
  $dotCall(tmpMCF, arr, `sort`);
} else {
}
const x = arr[0];
const tmpMCF$1 = x.slice;
const y = $dotCall(tmpMCF$1, x, `slice`, 0, 2);
$(y);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_sort
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_sort


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'fi'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
