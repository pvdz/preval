# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Throw > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

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
  
    $('unreachable');
  }
  $('after (unreachable)');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    $(`loop`);
    for (let x in { a: 1, b: 2 }) {
      $(`loop`, x);
      throw $(7, `throw`);
      $(`fail`);
    }
    $(`unreachable`);
  }
  $(`after (unreachable)`);
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
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x = undefined;
      for (x in tmpForInDeclRhs) {
        $(`loop`, x);
        const tmpThrowArg = $(7, `throw`);
        throw tmpThrowArg;
      }
      $(`unreachable`);
    } else {
      break;
    }
  }
  $(`after (unreachable)`);
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
  let x = undefined;
  const tmpForInDeclRhs = { a: 1, b: 2 };
  for (x in tmpForInDeclRhs) {
    $(`loop`, x);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  }
  $(`unreachable`);
} else {
  $(`after (unreachable)`);
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "loop" );
  let b = undefined;
  const c = {
    a: 1,
    b: 2,
  };
  for (b in c) {
    $( "loop", b );
    const d = $( 7, "throw" );
    throw d;
  }
  $( "unreachable" );
}
else {
  $( "after (unreachable)" );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
