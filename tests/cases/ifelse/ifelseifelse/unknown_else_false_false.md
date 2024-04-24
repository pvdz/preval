# Preval test case

# unknown_else_false_false.md

> Ifelse > Ifelseifelse > Unknown else false false
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
  condition = $(false);
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
  condition = $(false);
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
  condition = $(false);
  f();
}
`````

## Output

`````js filename=intro
const condition = $(false);
let tmpIfelseifelse = true;
if (condition) {
  $(`a`);
} else {
  tmpIfelseifelse = $(false);
  if (tmpIfelseifelse) {
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
let b = true;
if (a) {
  $( "a" );
}
else {
  b = $( false );
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
 - 2: false
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
