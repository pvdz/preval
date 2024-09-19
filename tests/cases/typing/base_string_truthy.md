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

## Output


`````js filename=intro
const tmpBinBothRhs = $(`pass`);
const b /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
if (b) {
  $(b);
} else {
  $(``);
}
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
