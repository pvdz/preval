# Preval test case

# base_16.md

> Bit hacks > If return bit > Base 16
>
> When an if checks whether a single bit is set and then returns a literal it should be replaced with that value

## Input

`````js filename=intro
function f(a) {
  const x = a & 16;
  if (x) return 16;
  else return 0;
}
$((f($(16))));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(16);
const x /*:number*/ = tmpCalleeParam$1 & 16;
if (x) {
  $(16);
} else {
  $(0);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(16) & 16) {
  $(16);
} else {
  $(0);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 16;
  if (x) return 16;
  else return 0;
};
$(f($(16)));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 16;
  if (x) {
    return 16;
  } else {
    return 0;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(16);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 16 );
const b = a & 16;
if (b) {
  $( 16 );
}
else {
  $( 0 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 16
 - 2: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
