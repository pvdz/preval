# Preval test case

# mutated_maybe.md

> Array > Manipulation > Reverse > Mutated maybe
>
> The pop will resolve first so the reverse works

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $(arr.pop());
}
const rra = arr.reverse();
$(rra);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  $(arr.pop());
}
const rra = arr.reverse();
$(rra);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4];
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = arr.pop();
  tmpCallCallee(tmpCalleeParam);
} else {
}
const rra = arr.reverse();
$(rra);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1, 2, 3, 4];
if ($) {
  const tmpCalleeParam /*:unknown*/ = arr.pop();
  $(tmpCalleeParam);
} else {
}
arr.reverse();
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
if ($) {
  const b = a.pop();
  $( b );
}
a.reverse();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - 2: [3, 2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
