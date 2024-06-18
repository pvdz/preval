# Preval test case

# kept4.md

> Continue > Kept4
>
> Example of where continue is not eliminated

## Input

`````js filename=intro
function $continue() {
  if ($()) {
    if ($()) {
      $continue();
      return;
    }
  }
  if ($()) {
    return;
  }
  $continue();
  return;
}
$continue();
`````

## Pre Normal


`````js filename=intro
let $continue = function () {
  debugger;
  if ($()) {
    if ($()) {
      $continue();
      return;
    }
  }
  if ($()) {
    return;
  }
  $continue();
  return;
};
$continue();
`````

## Normalized


`````js filename=intro
let $continue = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
$continue();
`````

## Output


`````js filename=intro
const $continue = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
$continue();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  if (b) {
    const c = $();
    if (c) {
      a();
      return undefined;
    }
  }
  const d = $();
  if (d) {
    return undefined;
  }
  else {
    a();
    return undefined;
  }
};
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - 7: 
 - 8: 
 - 9: 
 - 10: 
 - 11: 
 - 12: 
 - 13: 
 - 14: 
 - 15: 
 - 16: 
 - 17: 
 - 18: 
 - 19: 
 - 20: 
 - 21: 
 - 22: 
 - 23: 
 - 24: 
 - 25: 
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
