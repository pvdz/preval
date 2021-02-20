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

## Normalized

`````js filename=intro
function f() {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x;
      for (x in tmpForInDeclRhs) {
        $('loop', x);
        const tmpIfTest$1 = $(1, 'if');
        if (tmpIfTest$1) {
          $('pass');
          const tmpReturnArg = $(100, 'return');
          return tmpReturnArg;
        } else {
          $('do not visit');
          const tmpReturnArg$1 = $(101, 'return');
          return tmpReturnArg$1;
        }
      }
      $('after (not invoked but should not be eliminated)');
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x;
      for (x in tmpForInDeclRhs) {
        $('loop', x);
        const tmpIfTest$1 = $(1, 'if');
        if (tmpIfTest$1) {
          $('pass');
          const tmpReturnArg = $(100, 'return');
          return tmpReturnArg;
        } else {
          $('do not visit');
          const tmpReturnArg$1 = $(101, 'return');
          return tmpReturnArg$1;
        }
      }
      $('after (not invoked but should not be eliminated)');
    } else {
      break;
    }
  }
  $('after (not invoked)');
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
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

Normalized calls: Same

Final output calls: Same
