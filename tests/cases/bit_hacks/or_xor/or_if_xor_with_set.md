# Preval test case

# or_if_xor_with_set.md

> Bit hacks > Or xor > Or if xor with set
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

#TODO

## Input

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
} else {
}
$(x);
`````

## Output

`````js filename=intro
const x = $(35);
const y = x | 32;
if (y) {
  const tmpClusterSSA_x = x ^ 32;
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 35
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
