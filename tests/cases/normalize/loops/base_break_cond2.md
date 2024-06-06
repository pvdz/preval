# Preval test case

# base_break_cond2.md

> Normalize > Loops > Base break cond2
>
> A loop with a conditional early break

At some point the final result was receiving undefined rather than 100 because the common return algo had a bug.

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
$(f(), 'f');
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
$(f(), `f`);
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
const tmpCalleeParam$3 = `f`;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(1);
$(`afterwards`);
$(100, `f`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( "afterwards" );
$( 100, "f" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
