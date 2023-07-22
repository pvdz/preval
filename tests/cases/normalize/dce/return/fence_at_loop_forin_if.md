# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Return > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      if ($(1, 'if')) {
        $('pass');
        return $(100, 'return');
        $('fail');
      } else {
        $('do not visit');
        return $(101, 'return');
        $('fail');
      }
      $('fail -> DCE');
    }
  
    $('after (not invoked but should not be eliminated)');
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
    for (let x in { a: 1, b: 2 }) {
      $(`loop`, x);
      if ($(1, `if`)) {
        $(`pass`);
        return $(100, `return`);
        $(`fail`);
      } else {
        $(`do not visit`);
        return $(101, `return`);
        $(`fail`);
      }
      $(`fail -> DCE`);
    }
    $(`after (not invoked but should not be eliminated)`);
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x = undefined;
      for (x in tmpForInDeclRhs) {
        $(`loop`, x);
        const tmpIfTest$1 = $(1, `if`);
        if (tmpIfTest$1) {
          $(`pass`);
          const tmpReturnArg = $(100, `return`);
          return tmpReturnArg;
        } else {
          $(`do not visit`);
          const tmpReturnArg$1 = $(101, `return`);
          return tmpReturnArg$1;
        }
      }
      $(`after (not invoked but should not be eliminated)`);
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      for (x in tmpForInDeclRhs) {
        $(`loop`, x);
        const tmpIfTest$1 = $(1, `if`);
        if (tmpIfTest$1) {
          $(`pass`);
          const tmpReturnArg = $(100, `return`);
          return tmpReturnArg;
        } else {
          $(`do not visit`);
          const tmpReturnArg$1 = $(101, `return`);
          return tmpReturnArg$1;
        }
      }
      $(`after (not invoked but should not be eliminated)`);
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
      const d = {
a: 1,
b: 2
      ;
      for (c in d {
        $( "loop", c );
        const e = $( 1, "if" );
        if (e) {
          $( "pass" );
          const f = $( 100, "return" );
          return f;
        }
        else {
          $( "do not visit" );
          const g = $( 101, "return" );
          return g;
        }
      }
      $( "after (not invoked but should not be eliminated)" );
      b = $( true );
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
  return undefined;
};
const h = a();
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1, 'if'
 - 5: 'pass'
 - 6: 100, 'return'
 - 7: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
