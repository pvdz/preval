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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const b = `` + $(``);
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
  const tmpBinBothRhs = $(``);
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
const tmpBinBothRhs = $(``);
const b = $coerce(tmpBinBothRhs, `plustr`);
if (b) {
  $(b);
} else {
  $(``);
}
`````

## PST Output

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

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - 2: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
