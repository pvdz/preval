# Preval test case

# fence_at_loop_forof2.md

> Normalize > Dce > Return > Fence at loop forof2
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  for (let x of [1, 2]) {
    $('for', x);
    return;
  }

  // We can drop this if we implement a specific case for the `of` rhs being an array literal
  $('unreachable (but keep because the for body may not be visited...)');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  for (let x of [1, 2]) {
    $(`for`, x);
    return;
  }
  $(`unreachable (but keep because the for body may not be visited...)`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpForOfDeclRhs = [1, 2];
  let x = undefined;
  for (x of tmpForOfDeclRhs) {
    $(`for`, x);
    return undefined;
  }
  $(`unreachable (but keep because the for body may not be visited...)`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  let x = undefined;
  const tmpForOfDeclRhs = [1, 2];
  for (x of tmpForOfDeclRhs) {
    $(`for`, x);
    break $inlinedFunction;
  }
  $(`unreachable (but keep because the for body may not be visited...)`);
  tmpCalleeParam = undefined;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  let b = undefined;
  const c = [ 1, 2 ];
  for (b of c) {
    $( "for", b );
    break $inlinedFunction;
  }
  $( "unreachable (but keep because the for body may not be visited...)" );
  a = undefined;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'for', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
