# Preval test case

# rng3.md

> Math random > Floor trick > Rng3
>
> In this case the result is 1 2 or 3 and we can't really predict much more than that.

## Input

`````js filename=intro
const r = Math.random();
const a = r * 3;
const is_012 = Math.floor(a);
const is_123 = is_012 + 1;
$(is_123 === 1 || is_123 === 2 || is_123 === 3);
`````

## Pre Normal


`````js filename=intro
const r = Math.random();
const a = r * 3;
const is_012 = Math.floor(a);
const is_123 = is_012 + 1;
$(is_123 === 1 || is_123 === 2 || is_123 === 3);
`````

## Normalized


`````js filename=intro
const r = 0.12556649118791485;
const a = r * 3;
const is_012 = $Math_floor(a);
const is_123 = is_012 + 1;
const tmpCallCallee = $;
let tmpCalleeParam = is_123 === 1;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = is_123 === 2;
  if (tmpCalleeParam) {
  } else {
    tmpCalleeParam = is_123 === 3;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
