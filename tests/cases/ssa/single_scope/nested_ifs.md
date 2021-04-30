# Preval test case

# nested_ifs.md

> Ssa > Single scope > Nested ifs
>
> Bindings should find each other across ifs

#TODO

## Input

`````js filename=intro
const f = function (y) {
  let n = undefined; // This one should be eliminated and moved inside the `if`
  if (y) {
    n = 0;
    while (true) {
      if ($) {
        n = n + 1;
        break;
      }
    }
  }
};
$(f);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let y = $$0;
  debugger;
  let n = undefined;
  if (y) {
    n = 0;
    while (true) {
      if ($) {
        n = n + 1;
        break;
      }
    }
  }
};
$(f);
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let y = $$0;
  debugger;
  let n = undefined;
  if (y) {
    n = 0;
    while (true) {
      if ($) {
        n = n + 1;
        break;
      } else {
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const y = $$0;
  debugger;
  if (y) {
    let tmpSSA_n = 0;
    while (true) {
      if ($) {
        tmpSSA_n = tmpSSA_n + 1;
        break;
      } else {
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
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
