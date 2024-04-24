# Preval test case

# iife3.md

> This > Iife3
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($(1) && $(2)) {
    this;
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  if ($(1) && $(2)) {
    undefined;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  let tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpIfTest = $(2);
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
if (tmpIfTest) {
  tmpIfTest = $(2);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  a = $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
