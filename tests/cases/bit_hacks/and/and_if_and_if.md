# Preval test case

# and_if_and_if.md

> Bit hacks > And > And if and if
>
> Combine two checked ands

#TODO

## Input

`````js filename=intro
function f(a) {
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $('pass');
    }
  }
}

f(1);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
    }
  }
};
f(1);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
f(1);
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
