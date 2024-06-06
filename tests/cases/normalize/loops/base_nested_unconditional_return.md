# Preval test case

# base_nested_unconditional_return.md

> Normalize > Loops > Base nested unconditional return
>
> A nested loop with an unconditional early return

#TODO

## Input

`````js filename=intro
function f() {
  $('outer');
  while (true) {
    $('middle');
    while (true) {
      $('inner');
      return 100;
    }  
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`outer`);
  while (true) {
    $(`middle`);
    while (true) {
      $(`inner`);
      return 100;
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`outer`);
  while (true) {
    $(`middle`);
    while (true) {
      $(`inner`);
      return 100;
    }
  }
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`outer`);
$(`middle`);
$(`inner`);
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( "outer" );
$( "middle" );
$( "inner" );
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'outer'
 - 2: 'middle'
 - 3: 'inner'
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
