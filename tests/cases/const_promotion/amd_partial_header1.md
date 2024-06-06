# Preval test case

# amd_partial_header1.md

> Const promotion > Amd partial header1
>
> Or what's left of it after partial evaluation.

Why is the test not promoted to a const?

/*
  // Need to be able to configure this as globals somehow
  // Temp
  ['window', 'undefined'],
  ['self', 'undefined'],
  ['module', 'undefined'],
  ['exports', 'undefined'],
  ['require', 'undefined'],
  ['define', 'undefined'],
  ['global', 'object'],
*/

#TODO

## Input

`````js filename=intro
let alwaysFalse = false;
const f = function () {
  if (alwaysFalse) {
    $('a');
  } else {
    $('b');
  }
};
if (alwaysFalse) {
  alwaysFalse = false;
  f();
} else {
  f();
}
`````

## Pre Normal


`````js filename=intro
let alwaysFalse = false;
const f = function () {
  debugger;
  if (alwaysFalse) {
    $(`a`);
  } else {
    $(`b`);
  }
};
if (alwaysFalse) {
  alwaysFalse = false;
  f();
} else {
  f();
}
`````

## Normalized


`````js filename=intro
let alwaysFalse = false;
const f = function () {
  debugger;
  if (alwaysFalse) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
if (alwaysFalse) {
  alwaysFalse = false;
  f();
} else {
  f();
}
`````

## Output


`````js filename=intro
$(`b`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "b" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
