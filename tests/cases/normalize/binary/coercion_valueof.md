# Preval test case

# coercion_valueof.md

> Normalize > Binary > Coercion valueof
>
> Comparison ops trigger coercion mechanisms.

#TODO

## Input

`````js filename=intro
const a = $({valueOf: $});
const b = 2;
a < b; // This shouldn't be eliminated because it triggers the valueOf above
`````

## Pre Normal

`````js filename=intro
const a = $({ valueOf: $ });
const b = 2;
a < b;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { valueOf: $ };
const a = tmpCallCallee(tmpCalleeParam);
const b = 2;
a < b;
`````

## Output

`````js filename=intro
const tmpCalleeParam = { valueOf: $ };
const a = $(tmpCalleeParam);
a < 0;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { valueOf: '"<$>"' }
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
