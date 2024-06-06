# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Return > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x of [1, 2]) {
      $('loop', x);
      return $(100, 'return');
      $('fail');
    }
  
    $('do not visit, do not eliminate');
  }
  $('after (not invoked)');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    $(`loop`);
    for (let x of [1, 2]) {
      $(`loop`, x);
      return $(100, `return`);
      $(`fail`);
    }
    $(`do not visit, do not eliminate`);
  }
  $(`after (not invoked)`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpIfTest = $(true);
  while (true) {
    if (tmpIfTest) {
      $(`loop`);
      const tmpForOfDeclRhs = [1, 2];
      let x = undefined;
      for (x of tmpForOfDeclRhs) {
        $(`loop`, x);
        const tmpReturnArg = $(100, `return`);
        return tmpReturnArg;
      }
      $(`do not visit, do not eliminate`);
      tmpIfTest = $(true);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  let tmpIfTest = $(true);
  while (true) {
    if (tmpIfTest) {
      $(`loop`);
      let x = undefined;
      const tmpForOfDeclRhs = [1, 2];
      for (x of tmpForOfDeclRhs) {
        $(`loop`, x);
        const tmpReturnArg = $(100, `return`);
        return tmpReturnArg;
      }
      $(`do not visit, do not eliminate`);
      tmpIfTest = $(true);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = $( true );
  while (true) {
    if (b) {
      $( "loop" );
      let c = undefined;
      const d = [ 1, 2 ];
      for (c of d) {
        $( "loop", c );
        const e = $( 100, "return" );
        return e;
      }
      $( "do not visit, do not eliminate" );
      b = $( true );
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
  return undefined;
};
const f = a();
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 1
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
