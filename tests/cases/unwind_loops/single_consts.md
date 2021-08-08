# Preval test case

# single_consts.md

> Unwind loops > Single consts
>
> From react

#TODO

## Input

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Pre Normal

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Normalized

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Output

`````js filename=intro
const max = $(10);
let counter = 2;
let test = 2 < max;
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpArgumentsLen$9

## Result

Should call `$` with:
 - 1: 10
 - 2: 103
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
