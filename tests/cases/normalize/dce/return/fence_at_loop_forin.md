# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Return > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      return $(100, 'return');
      $('fail');
    }
  
    $('fail');
  }
  $('after (not invoked but should not be eliminated)');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    $(`loop`);
    for (let x in { a: 1, b: 2 }) {
      $(`loop`, x);
      return $(100, `return`);
      $(`fail`);
    }
    $(`fail`);
  }
  $(`after (not invoked but should not be eliminated)`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x = undefined;
      for (x in tmpForInDeclRhs) {
        $(`loop`, x);
        const tmpReturnArg = $(100, `return`);
        return tmpReturnArg;
      }
      $(`fail`);
    } else {
      break;
    }
  }
  $(`after (not invoked but should not be eliminated)`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      let x = undefined;
      const tmpForInDeclRhs = { a: 1, b: 2 };
      for (x in tmpForInDeclRhs) {
        $(`loop`, x);
        const tmpReturnArg = $(100, `return`);
        tmpCalleeParam = tmpReturnArg;
        break $inlinedFunction;
      }
      $(`fail`);
    } else {
      break;
    }
  }
  $(`after (not invoked but should not be eliminated)`);
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  while (true) {
    const b = $( true );
    if (b) {
      $( "loop" );
      let c = undefined;
      const d = {
        a: 1,
        b: 2,
      };
      for (c in d) {
        $( "loop", c );
        const e = $( 100, "return" );
        a = e;
        break $inlinedFunction;
      }
      $( "fail" );
    }
    else {
      break;
    }
  }
  $( "after (not invoked but should not be eliminated)" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
