# Preval test case

# write_read_before_func_pass.md

> Ssa > Multi scope > Write read before func pass
>
> A binding that is always written before read is a prime target for SSA

In this case there is a func definition between the let and its first usage. It was blocking the SSA promotion.

## Input

`````js filename=intro
const x = $('a');
let y = x === 'a';
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
if (y) {
  g();
}
`````

## Pre Normal


`````js filename=intro
const x = $(`a`);
let y = x === `a`;
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
if (y) {
  g();
}
`````

## Normalized


`````js filename=intro
const x = $(`a`);
let y = x === `a`;
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
if (y) {
  g();
} else {
}
`````

## Output


`````js filename=intro
const x = $(`a`);
const y = x === `a`;
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

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = a === "a";
if (b) {
  const c = tmpthis$63.getInitialState;
  const d = c._isMockFunction;
  if (d) {
    $( 1 );
  }
  else {
    $( 2 );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpthis$63

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
