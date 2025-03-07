# Preval test case

# base_string_truthy.md

> Typing > Base string truthy
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

## Input

`````js filename=intro
function f() {
  const b = '' + $('pass'); // We can infer the empty string...
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
const tmpBinBothRhs /*:unknown*/ = $(`pass`);
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
const b = $coerce($(`pass`), `plustr`);
if (b) {
  $(b);
} else {
  $(``);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const b = `` + $(`pass`);
  if (b) {
    $(b);
  } else {
    $(b);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $(`pass`);
  const b = tmpBinBothLhs + tmpBinBothRhs;
  if (b) {
    $(b);
    return undefined;
  } else {
    $(b);
    return undefined;
  }
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = $coerce( a, "plustr" );
if (b) {
  $( b );
}
else {
  $( "" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
