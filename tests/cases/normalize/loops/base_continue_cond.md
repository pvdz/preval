# Preval test case

# base_continue_cond.md

> Normalize > Loops > Base continue cond
>
> A loop with a conditional early continue

#TODO

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    ++n;
    if (n < 8) break;
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
    if (n < 8) break;
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
    const tmpIfTest = n < 8;
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
  const tmpIfTest = n < 8;
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
