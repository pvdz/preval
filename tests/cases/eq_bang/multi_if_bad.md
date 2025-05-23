# Preval test case

# multi_if_bad.md

> Eq bang > Multi if bad
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
$(same);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
const same /*:boolean*/ = a === b;
if (same) {
  $(true);
} else {
  $(`a`);
  $(`b`);
  $(`c`);
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(2)) {
  $(true);
} else {
  $(`a`);
  $(`b`);
  $(`c`);
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
if (c) {
  $( true );
}
else {
  $( "a" );
  $( "b" );
  $( "c" );
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (same) {
  $(same);
} else {
  $(`a`);
  if (same) {
    $(same);
  } else {
    $(`b`);
    if (same) {
      $(same);
    } else {
      $(`c`);
      $(same);
    }
  }
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
 - 6: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
