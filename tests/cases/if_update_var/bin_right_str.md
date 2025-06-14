# Preval test case

# bin_right_str.md

> If update var > Bin right str
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

The idea is that `x` will be replaced by `y` here.

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = 'left' + x;
$(y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`left100`);
} else {
  $(`left200`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`left100`);
} else {
  $(`left200`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "left100" );
}
else {
  $( "left200" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 100;
} else {
  x = 200;
}
const tmpStringConcatL = $coerce(x, `plustr`);
const y = `left${tmpStringConcatL}`;
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'left100'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
