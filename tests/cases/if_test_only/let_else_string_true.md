# Preval test case

# let_else_string_true.md

> If test only > Let else string true
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
  THIS_IS_BOOL = 'yes';
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
const tmpBool /*:boolean*/ = Boolean(tmpIfTest);
const tmpUnaryArg /*:unknown*/ = $(tmpBool);
if (tmpUnaryArg) {
  $(`b`);
} else {
  $(`a`);
}
$(`d`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(Boolean($(true)))) {
  $(`b`);
} else {
  $(`a`);
}
$(`d`);
`````

## Pre Normal


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
  THIS_IS_BOOL = `yes`;
}
if (THIS_IS_BOOL) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Normalized


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
  THIS_IS_BOOL = `yes`;
}
if (THIS_IS_BOOL) {
  $(`d`);
} else {
  $(`c`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = $( b );
if (c) {
  $( "b" );
}
else {
  $( "a" );
}
$( "d" );
`````

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
