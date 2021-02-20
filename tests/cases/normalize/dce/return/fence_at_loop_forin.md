# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Return > Fence at loop forin
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
      return $(100, 'return');
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x;
      for (x in tmpForInDeclRhs) {
        $('loop', x);
        const tmpReturnArg = $(100, 'return');
        return tmpReturnArg;
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x;
      for (x in tmpForInDeclRhs) {
        $('loop', x);
        const tmpReturnArg = $(100, 'return');
        return tmpReturnArg;
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

Normalized calls: Same

Final output calls: Same
