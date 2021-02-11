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
      return $(100, 'return');
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
      let tmpDoWhileTest;
      do {
        $('loop');
        const tmpReturnArg = $(100, 'return');
        return tmpReturnArg;
      } while (tmpDoWhileTest);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
