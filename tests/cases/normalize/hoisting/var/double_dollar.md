# Preval test case

# double_dollar.md

> Normalize > Hoisting > Var > Double dollar
>
> Duplicate var statements is legit but we should drop the duplicate version

#TODO

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
$(x);
`````

## Output

`````js filename=intro
$(1);
const x = $(2);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
