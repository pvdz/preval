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
    $(++n);
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
    $(++n);
    if (n < 4) break;
  }
  $(`afterwards`);
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
    const tmpCallCallee = $;
    n = n + 1;
    let tmpCalleeParam = n;
    tmpCallCallee(tmpCalleeParam);
    const tmpIfTest = n < 4;
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  $(`afterwards`);
  return 100;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(1);
$(`afterwards`);
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( "afterwards" );
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
