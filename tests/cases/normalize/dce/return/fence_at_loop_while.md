# Preval test case

# fence_at_loop.md

> normalize > dce > continue > fence_at_loop
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f(){
  while ($(true)) {
    $('loop');
    
    while ($(true)) {
      $('loop');
      return $(100, 'return');
      $('fail');
    }
    
    $('do not visit, do not eliminate');
  }
  $('after (not invoked)');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      while (true) {
        const tmpIfTest$1 = $(true);
        if (tmpIfTest$1) {
          $('loop');
          const tmpReturnArg = $(100, 'return');
          return tmpReturnArg;
        } else {
          break;
        }
      }
      $('do not visit, do not eliminate');
    } else {
      break;
    }
  }
  $('after (not invoked)');
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      while (true) {
        const tmpIfTest$1 = $(true);
        if (tmpIfTest$1) {
          $('loop');
          const tmpReturnArg = $(100, 'return');
          return tmpReturnArg;
        } else {
          break;
        }
      }
      $('do not visit, do not eliminate');
    } else {
      break;
    }
  }
  $('after (not invoked)');
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 100, 'return'
 - 6: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same