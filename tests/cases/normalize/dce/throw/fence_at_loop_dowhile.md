# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Throw > Fence at loop dowhile
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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    $(`loop`);
    {
      let tmpDoWhileFlag = true;
      while (tmpDoWhileFlag) {
        {
          $(`loop`);
          throw $(7, `throw`);
          $(`fail`);
        }
        tmpDoWhileFlag = $(true);
      }
    }
    $(`do not visit, do not eliminate`);
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
  while (tmpIfTest) {
    $(`loop`);
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag) {
      $(`loop`);
      const tmpThrowArg = $(7, `throw`);
      throw tmpThrowArg;
    }
    $(`do not visit, do not eliminate`);
    tmpIfTest = $(true);
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
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`loop`);
  $(`loop`);
  const tmpThrowArg = $(7, `throw`);
  throw tmpThrowArg;
} else {
  $(`after (not invoked)`);
  $(undefined);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
