# Preval test case

# indexed_typing_popunshift.md

> Array > Ranged > Indexed typing popunshift
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
  const t = arr.pop();
  arr.unshift(t);
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
  const t /*:primitive*/ /*truthy*/ = $dotCall($array_pop, arr, `pop`);
  $dotCall($array_unshift, arr, `unshift`, t);
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
  $dotCall($array_unshift, arr, `unshift`, $dotCall($array_pop, arr, `pop`));
}
$($dotCall($string_slice, arr[0], `slice`, 0, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = [ "one", "two", "three", "four", "five" ];
if (a) {
  const c = $dotCall( $array_pop, b, "pop" );
  $dotCall( $array_unshift, b, "unshift", c );
}
const d = b[ 0 ];
const e = $dotCall( $string_slice, d, "slice", 0, 2 );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpMCF = arr.pop;
  const t = $dotCall(tmpMCF, arr, `pop`);
  const tmpMCF$1 = arr.unshift;
  $dotCall(tmpMCF$1, arr, `unshift`, t);
} else {
}
const x = arr[0];
const tmpMCF$3 = x.slice;
const y = $dotCall(tmpMCF$3, x, `slice`, 0, 2);
$(y);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_pop
- (todo) access object property that also exists on prototype? $array_unshift
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_pop


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
