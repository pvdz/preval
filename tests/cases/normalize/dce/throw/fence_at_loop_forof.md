# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Throw > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x of [1, 2]) {
      $('loop', x);
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
    for (let x of [1, 2]) {
      $(`loop`, x);
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
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpForOfDeclRhs = [1, 2];
      let x = undefined;
      for (x of tmpForOfDeclRhs) {
        $(`loop`, x);
        const tmpThrowArg = $(7, `throw`);
        throw tmpThrowArg;
      }
      $(`do not visit, do not eliminate`);
    } else {
      break;
    }
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
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    let x = undefined;
    const tmpForOfDeclRhs = [1, 2];
    for (x of tmpForOfDeclRhs) {
      $(`loop`, x);
      const tmpThrowArg = $(7, `throw`);
      throw tmpThrowArg;
    }
    $(`do not visit, do not eliminate`);
  } else {
    break;
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
 - 3: 'loop', 1
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
