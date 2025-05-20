# Preval test case

# base_let_looped.md

> If merging > Base let looped
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
let x 
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) $('a'); else $('b');
if (x) $('d'); else $('c');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = $boolean_constructor(tmpIfTest);
const x /*:unknown*/ = $(tmpBool);
if (x) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($($boolean_constructor($(true)))) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $boolean_constructor( a );
const c = $( b );
if (c) {
  $( "b" );
  $( "c" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'b'
 - 4: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
