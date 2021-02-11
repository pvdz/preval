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
      let tmpDoWhileTest;
      do {
        $('loop');
        let tmpThrowArg = $(7, 'throw');
        throw tmpThrowArg;
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
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
