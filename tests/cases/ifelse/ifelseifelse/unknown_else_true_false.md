# Preval test case

# unknown_else_true_false.md

> Ifelse > Ifelseifelse > Unknown else true false
>
> Common pattern of doing if-elseif-else after normalization. Will want to test all variations of known and unknown booleans, as well as which branch updates the condition.

## Input

`````js filename=intro
let condition = $(true);
const f = function() {
  if (condition) {
    $('a');
  } else {
    $('b');
  }
};
if (condition) {
  f();
} else {
  condition = $(false);
  f();
}
`````

## Pre Normal


`````js filename=intro
let condition = $(true);
const f = function () {
  debugger;
  if (condition) {
    $(`a`);
  } else {
    $(`b`);
  }
};
if (condition) {
  f();
} else {
  condition = $(false);
  f();
}
`````

## Normalized


`````js filename=intro
let condition = $(true);
const f = function () {
  debugger;
  if (condition) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
if (condition) {
  f();
} else {
  condition = $(false);
  f();
}
`````

## Output


`````js filename=intro
const condition /*:unknown*/ = $(true);
if (condition) {
  $(`a`);
} else {
  const tmpClusterSSA_tmpIfelseifelse /*:unknown*/ = $(false);
  if (tmpClusterSSA_tmpIfelseifelse) {
    $(`a`);
  } else {
    $(`b`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "a" );
}
else {
  const b = $( false );
  if (b) {
    $( "a" );
  }
  else {
    $( "b" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
