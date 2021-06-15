# Preval test case

# write_read_after_func.md

> Ssa > Multi scope > Write read after func
>
> A binding that is always written before read is a prime target for SSA

In this case the let occurs after a func, immediately next to the usage

#TODO

## Input

`````js filename=intro
const x = $('a');
const g = function () {
  debugger;
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  y = tmpAssignRhsProp$105._isMockFunction;
  if (y) {
    $(1);
  } else {
    $(2);
  }
};
let y = x === 'undefined';
if (y) {
  g();
}
`````

## Pre Normal

`````js filename=intro
const x = $(`a`);
const g = function () {
  debugger;
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  y = tmpAssignRhsProp$105._isMockFunction;
  if (y) {
    $(1);
  } else {
    $(2);
  }
};
let y = x === `undefined`;
if (y) {
  g();
}
`````

## Normalized

`````js filename=intro
const x = $(`a`);
const g = function () {
  debugger;
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  y = tmpAssignRhsProp$105._isMockFunction;
  if (y) {
    $(1);
    return undefined;
  } else {
    $(2);
    return undefined;
  }
};
let y = x === `undefined`;
if (y) {
  g();
} else {
}
`````

## Output

`````js filename=intro
const x = $(`a`);
const y = x === `undefined`;
if (y) {
  const tmpAssignRhsProp$105 = tmpthis$63.getInitialState;
  const tmpssa2_y = tmpAssignRhsProp$105._isMockFunction;
  if (tmpssa2_y) {
    $(1);
  } else {
    $(2);
  }
} else {
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpthis$63

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
