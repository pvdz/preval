# Preval test case

# write-read-all-scopes-branched.md

> Let hoisting > Multi-scope-all-write > Write-read-all-scopes-branched
>
> What if the first ref of a scope has a write but not all reads in that scope can reach it?

#TODO

## Input

`````js filename=intro
let x = 1;
const f = function() {
  if ($) {
    x = 2;
    if ($) {
      $(x);
    }
  }
  $(x);
}
if ($) {
  f();
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = 1;
const f = function () {
  debugger;
  if ($) {
    x = 2;
    if ($) {
      $(x);
    }
  }
  $(x);
};
if ($) {
  f();
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = 1;
const f = function () {
  debugger;
  if ($) {
    x = 2;
    if ($) {
      $(x);
    } else {
    }
  } else {
  }
  $(x);
  return undefined;
};
if ($) {
  f();
  $(x);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  $(2);
  $(2);
  $(2);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
