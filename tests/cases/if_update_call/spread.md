# Preval test case

# spread.md

> If update call > Spread
>
> If a variable is conditionally set and then used in a call after the `if`/`else`, we can hoist the call inside those branches.

#TODO

## Input

`````js filename=intro
const a = $([100, 200])
let x = undefined;
if ($(true)) {
  const r = [1, 2];
  x = r;
} else {
  const r = [3, 4];
  x = r;
}
$( ...x);
`````

## Pre Normal

`````js filename=intro
const a = $([100, 200]);
let x = undefined;
if ($(true)) {
  const r = [1, 2];
  x = r;
} else {
  const r$1 = [3, 4];
  x = r$1;
}
$(...x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [100, 200];
const a = tmpCallCallee(tmpCalleeParam);
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const r = [1, 2];
  x = r;
} else {
  const r$1 = [3, 4];
  x = r$1;
}
$(...x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [100, 200];
$(tmpCalleeParam);
const tmpIfTest = $(true);
if (tmpIfTest) {
  const r = [1, 2];
  $(...r);
} else {
  const r$1 = [3, 4];
  $(...r$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [100, 200]
 - 2: true
 - 3: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
