# Preval test case

# base_break_cond.md

> Normalize > Loops > Base break cond
>
> A loop with a conditional early break

#TODO

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    ++n;
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    ++n;
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    n = n + 1;
    const tmpIfTest = n < 4;
    if (tmpIfTest) {
      break;
    }
  }
  $('afterwards');
  return 100;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let n = 0;
while (true) {
  n = n + 1;
  const tmpIfTest = n < 4;
  if (tmpIfTest) {
    break;
  }
}
$('afterwards');
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'afterwards'
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
