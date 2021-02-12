# Preval test case

# fence_at_loop.md

> normalize > dce > continue > fence_at_loop
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
        throw $(7, 'throw');
        $('fail');
      } else {
        $('do not visit');
        throw $(8, 'throw');
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
      {
        const tmpForInDeclRhs = { a: 1, b: 2 };
        let x;
        for (x in tmpForInDeclRhs) {
          $('loop', x);
          const tmpIfTest$1 = $(1, 'if');
          if (tmpIfTest$1) {
            $('pass');
            let tmpThrowArg = $(7, 'throw');
            throw tmpThrowArg;
          } else {
            $('do not visit');
            let tmpThrowArg$1 = $(8, 'throw');
            throw tmpThrowArg$1;
          }
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
      {
        const tmpForInDeclRhs = { a: 1, b: 2 };
        let x;
        for (x in tmpForInDeclRhs) {
          $('loop', x);
          const tmpIfTest$1 = $(1, 'if');
          if (tmpIfTest$1) {
            $('pass');
            let tmpThrowArg = $(7, 'throw');
            throw tmpThrowArg;
          } else {
            $('do not visit');
            let tmpThrowArg$1 = $(8, 'throw');
            throw tmpThrowArg$1;
          }
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

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1, 'if'
 - 5: 'pass'
 - 6: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Normalized calls: Same

Final output calls: Same
