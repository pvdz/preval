# Preval test case

# let_else_num_true.md

> If test only > Let else num true
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
let THIS_IS_BOOL /*:primitive*/ = 0;                // <-- this should be a boolean
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpUnaryArg /*:unknown*/ = $(true);
  THIS_IS_BOOL = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(false);
  THIS_IS_BOOL = !tmpUnaryArg$1;
}
if (THIS_IS_BOOL) {
  $(`a`);
} else {
  $(`b`);
  THIS_IS_BOOL = 10;
}
if (THIS_IS_BOOL) {
  $(`d`);
} else {
  $(`c`);
}
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
let THIS_IS_BOOL = 0;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpUnaryArg = $(true);
  THIS_IS_BOOL = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 = $(false);
  THIS_IS_BOOL = !tmpUnaryArg$1;
}
if (THIS_IS_BOOL) {
  $(`a`);
} else {
  $(`b`);
  THIS_IS_BOOL = 10;
}
if (THIS_IS_BOOL) {
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
