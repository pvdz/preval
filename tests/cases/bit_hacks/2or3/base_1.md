# Preval test case

# base_1.md

> Bit hacks > 2or3 > Base 1
>
> When comparing against two numbers that are one bit apart, we can merge them into an AND.

x === 2 || x === 3
->
(x & -2) === 2

Decided not to go forward with this one. There's no real advantage here and the result seems worse. Plus it triggers spies.

#TODO

## Input

`````js filename=intro
const x = $(1);
if (x === 2 || x === 3) $('pass');
else $('fail');
`````

## Pre Normal

`````js filename=intro
const x = $(1);
if (x === 2 || x === 3) $(`pass`);
else $(`fail`);
`````

## Normalized

`````js filename=intro
const x = $(1);
let tmpIfTest = x === 2;
if (tmpIfTest) {
} else {
  tmpIfTest = x === 3;
}
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const x = $(1);
let tmpIfTest = x === 2;
if (tmpIfTest) {
} else {
  tmpIfTest = x === 3;
}
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
