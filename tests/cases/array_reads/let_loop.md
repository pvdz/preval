# Preval test case

# let_loop.md

> Array reads > Let loop
>
> Inlining array properties

## Input

`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  arr = [2, 3, 4];
  $(arr[0]);
  if ($) break;
}
$(arr);
`````

## Pre Normal


`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  arr = [2, 3, 4];
  $(arr[0]);
  if ($) break;
}
$(arr);
`````

## Normalized


`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  arr = [2, 3, 4];
  const tmpCallCallee = $;
  const tmpCalleeParam = arr[0];
  tmpCallCallee(tmpCalleeParam);
  if ($) {
    break;
  } else {
  }
}
$(arr);
`````

## Output


`````js filename=intro
let arr /*:array*/ = [2, 3, 4];
$(2);
if ($) {
} else {
  while ($LOOP_UNROLL_10) {
    arr = [2, 3, 4];
    $(2);
    if ($) {
      break;
    } else {
    }
  }
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [ 2, 3, 4 ];
$( 2 );
if ($) {

}
else {
  while ($LOOP_UNROLL_10) {
    a = [ 2, 3, 4 ];
    $( 2 );
    if ($) {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
