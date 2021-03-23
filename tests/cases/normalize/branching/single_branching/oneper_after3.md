# Preval test case

# oneper_after3.md

> Normalize > Branching > Single branching > Oneper after3
>
> One branch per func?

B is now prevented from being inlined (at least at the time of writing).
C was not being inlined despite being called once.

## Input

`````js filename=intro
const A = function () {
  const x = $();
  if (x) {
    const tmp = B();
    return tmp;
  } else {
    const tmp = B()
    return tmp;
  }
}
const B = function () {
  $();
  const tmp = C();
  return tmp;
}
const C = function () {
  const x = $();
  if (x) {
    const tmp = $();
    return tmp;
  }
}
A();
`````

## Pre Normal

`````js filename=intro
const A = function () {
  debugger;
  const x = $();
  if (x) {
    const tmp = B();
    return tmp;
  } else {
    const tmp$1 = B();
    return tmp$1;
  }
};
const B = function () {
  debugger;
  $();
  const tmp$2 = C();
  return tmp$2;
};
const C = function () {
  debugger;
  const x$1 = $();
  if (x$1) {
    const tmp$3 = $();
    return tmp$3;
  }
};
A();
`````

## Normalized

`````js filename=intro
const A = function () {
  debugger;
  const x = $();
  if (x) {
    const tmp = B();
    return tmp;
  } else {
    const tmp$1 = B();
    return tmp$1;
  }
};
const B = function () {
  debugger;
  $();
  const tmp$2 = C();
  return tmp$2;
};
const C = function () {
  debugger;
  const x$1 = $();
  if (x$1) {
    const tmp$3 = $();
    return tmp$3;
  }
};
A();
`````

## Output

`````js filename=intro
const B = function () {
  debugger;
  $();
  const x$1 = $();
  if (x$1) {
    const tmpReturnArg = $();
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const x = $();
if (x) {
  B();
} else {
  B();
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
