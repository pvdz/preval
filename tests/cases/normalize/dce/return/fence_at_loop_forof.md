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
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      const tmpForOfDeclRhs = [1, 2];
      let x;
      for (x of tmpForOfDeclRhs) {
        $('loop', x);
        const tmpReturnArg = $(100, 'return');
        return tmpReturnArg;
      }
      $('do not visit, do not eliminate');
    } else {
      break;
    }
  }
  $('after (not invoked)');
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      const tmpForOfDeclRhs = [1, 2];
      let x;
      for (x of tmpForOfDeclRhs) {
        $('loop', x);
        const tmpReturnArg = $(100, 'return');
        return tmpReturnArg;
      }
      $('do not visit, do not eliminate');
    } else {
      break;
    }
  }
  $('after (not invoked)');
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
