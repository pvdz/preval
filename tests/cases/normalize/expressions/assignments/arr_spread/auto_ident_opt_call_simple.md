# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $?.(1))]);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
let tmpArrSpread /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  a = $(1);
  tmpArrSpread = a;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
let tmpArrSpread = undefined;
if (!tmpIfTest) {
  a = $(1);
  tmpArrSpread = a;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  a = $( 1 );
  c = a;
}
const d = [ ...c ];
$( d );
$( a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
