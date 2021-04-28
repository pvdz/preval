# Preval test case

# unknown_if_false_true.md

> Ifelse > Ifelseifelse > Unknown if false true
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
  condition = $(true);
  f();
} else {
  f();
}
`````

## Pre Normal

`````js filename=intro
let condition = $(false);
const f = function () {
  debugger;
  if (condition) {
    $('a');
  } else {
    $('b');
  }
};
if (condition) {
  condition = $(true);
  f();
} else {
  f();
}
`````

## Normalized

`````js filename=intro
let condition = $(false);
const f = function () {
  debugger;
  if (condition) {
    $('a');
    return undefined;
  } else {
    $('b');
    return undefined;
  }
};
if (condition) {
  condition = $(true);
  f();
} else {
  f();
}
`````

## Output

`````js filename=intro
const condition = $(false);
const f = function () {
  debugger;
  if (tmpIfelseifelse) {
    $('a');
    return undefined;
  } else {
    $('b');
    return undefined;
  }
};
let tmpIfelseifelse = undefined;
if (condition) {
  tmpIfelseifelse = $(true);
  f();
} else {
  tmpIfelseifelse = false;
  $('b');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same