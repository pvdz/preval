# Preval test case

# unknown_else_false_true.md

> Ifelse > Ifelseifelse > Unknown else false true
>
> Common pattern of doing if-elseif-else after normalization. Will want to test all variations of known and unknown booleans, as well as which branch updates the condition.

#TODO

## Input

`````js filename=intro
let condition = $(false);
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
  condition = $(true);
  f();
}
`````

## Pre Normal


`````js filename=intro
let condition = $(false);
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
  condition = $(true);
  f();
}
`````

## Normalized


`````js filename=intro
let condition = $(false);
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
  condition = $(true);
  f();
}
`````

## Output


`````js filename=intro
const condition = $(false);
if (condition) {
  $(`a`);
} else {
  const tmpClusterSSA_tmpIfelseifelse = $(true);
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
const a = $( false );
if (a) {
  $( "a" );
}
else {
  const b = $( true );
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
 - 1: false
 - 2: true
 - 3: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
