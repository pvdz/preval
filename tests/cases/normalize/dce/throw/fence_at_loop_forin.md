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
      throw $(7, 'throw');
      $('fail');
    }
  
    $('fail');
  }
  $('after (not invoked but should not be eliminated)');
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
          const tmpThrowArg = $(7, 'throw');
          throw tmpThrowArg;
        }
      }
      $('fail');
    } else {
      break;
    }
  }
  $('after (not invoked but should not be eliminated)');
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
          const tmpThrowArg = $(7, 'throw');
          throw tmpThrowArg;
        }
      }
      $('fail');
    } else {
      break;
    }
  }
  $('after (not invoked but should not be eliminated)');
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Normalized calls: Same

Final output calls: Same