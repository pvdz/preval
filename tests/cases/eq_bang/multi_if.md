# Preval test case

# multi_if.md

> Eq bang > Multi if
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (!same) $('a');
if (!same) $('b');
if (!same) $('c');
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
const same /*:boolean*/ = a === b;
if (same) {
} else {
  $(`a`);
  $(`b`);
  $(`c`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
if (!(a === $(2))) {
  $(`a`);
  $(`b`);
  $(`c`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
if (c) {

}
else {
  $( "a" );
  $( "b" );
  $( "c" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'a'
 - 4: 'b'
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
