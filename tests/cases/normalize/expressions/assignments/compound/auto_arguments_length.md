# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Compound > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= arguments));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = a * arguments;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_a = a * arguments;
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
