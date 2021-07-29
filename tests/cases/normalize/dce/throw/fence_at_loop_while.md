# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Throw > Fence at loop while
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
      throw $(7, 'throw');
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
  debugger;
  while ($(true)) {
    $(`loop`);
    while ($(true)) {
      $(`loop`);
      throw $(7, `throw`);
      $(`fail`);
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
    let tmpIfTest$1 = $(true);
    while (tmpIfTest$1) {
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
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(`loop`);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  } else {
    $(`do not visit, do not eliminate`);
    tmpIfTest = $(true);
  }
}
$(`after (not invoked)`);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
