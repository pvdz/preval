# Preval test case

# concat_arrays_assign_nums.md

> Builtins cases > Array > Concat arrays assign nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
let c;
if ($) {
  c = a.concat(b);
}
$(c);
`````

## Pre Normal


`````js filename=intro
const a = [1];
const b = [2];
let c;
if ($) {
  c = a.concat(b);
}
$(c);
`````

## Normalized


`````js filename=intro
const a = [1];
const b = [2];
let c = undefined;
if ($) {
  c = a.concat(b);
} else {
}
$(c);
`````

## Output


`````js filename=intro
if ($) {
  const tmpClusterSSA_c /*:array*/ = [1, 2];
  $(tmpClusterSSA_c);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = [ 1, 2 ];
  $( a );
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_concat