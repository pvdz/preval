# Preval test case

# switch_case_case_default_break2.md

> Switch > Switch case case default break2
>
>

## Input

`````js filename=intro
function f() {
  target: {
    if ($ || $) {
      break target;
    } else {}
  }
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  target: {
    if ($ || $) {
      break target;
    } else {
    }
  }
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpIfTest = $;
  if (tmpIfTest) {
    return undefined;
  } else {
    tmpIfTest = $;
    return undefined;
  }
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
