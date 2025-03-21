# Preval test case

# base_string_falsey.md

> Typing > Base string falsey
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

## Input

`````js filename=intro
function f() {
  const b = '' + $(''); // We can infer the empty string...
  if (b) {
    $(b);
  } else {
    $(b);
  }
}
f();
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(``);
const b /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
if (b) {
  $(b);
} else {
  $(``);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $coerce($(``), `plustr`);
if (b) {
  $(b);
} else {
  $(``);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "plustr" );
if (b) {
  $( b );
}
else {
  $( "" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
