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
  f();
} else {
  condition = $(false);
  f();
}
`````

## Output

`````js filename=intro
const condition = $(false);
if (condition) {
  $('a');
} else {
  const tmpSSA_tmpIfelseifelse = $(false);
  if (tmpSSA_tmpIfelseifelse) {
    $('a');
  } else {
    $('b');
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
