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
    
    do {
      $('loop');
      throw $(7, 'throw');
      $('fail');
    } while ($(true));
    
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
      let tmpDoWhileFlag = true;
      while (true) {
        let tmpIfTest$1 = tmpDoWhileFlag;
        if (tmpIfTest$1) {
        } else {
          tmpIfTest$1 = $(true);
        }
        if (tmpIfTest$1) {
          tmpDoWhileFlag = false;
          $('loop');
          let tmpThrowArg = $(7, 'throw');
          throw tmpThrowArg;
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
      let tmpDoWhileFlag = true;
      while (true) {
        let tmpIfTest$1 = tmpDoWhileFlag;
        if (tmpIfTest$1) {
        } else {
          tmpIfTest$1 = $(true);
        }
        if (tmpIfTest$1) {
          tmpDoWhileFlag = false;
          $('loop');
          let tmpThrowArg = $(7, 'throw');
          throw tmpThrowArg;
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
 - 3: 'loop'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Normalized calls: Same

Final output calls: Same
