# Preval test case

# base_let_else.md

> If test merging > Base let else
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
if (x) {
  $('a');
} else {
  $('b');
  x = 10; // Blocks the merge
}
if (x) $('d'); else $('c');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = $boolean_constructor(tmpIfTest);
const tmpUnaryArg /*:unknown*/ = $(tmpBool);
if (tmpUnaryArg) {
  $(`b`);
  $(`d`);
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
  $(`d`);
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
  $( "d" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpUnaryArg = $(true);
  x = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 = $(false);
  x = !tmpUnaryArg$1;
}
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = 10;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
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
 - 4: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
