# Preval test case

# with_tail3.md

> Ifelse > Label > With tail3
>
> Regression

Something was allowing the collapse of a function to global space causing a return statement to appear outside of a function.

## Input

`````js filename=intro
const B = function () {
  const C = function () {
    const x = $(true);
    if (x) {
      $('inner');
    }
  };
  const r = C();
  return r;
};
B();

`````

## Pre Normal

`````js filename=intro
const B = function () {
  const C = function () {
    const x = $(true);
    if (x) {
      $('inner');
    }
  };
  const r = C();
  return r;
};
B();
`````

## Normalized

`````js filename=intro
const B = function () {
  const C = function () {
    const x = $(true);
    if (x) {
      $('inner');
    }
  };
  const r = C();
  return r;
};
B();
`````

## Output

`````js filename=intro
const x = $(true);
if (x) {
  $('inner');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
