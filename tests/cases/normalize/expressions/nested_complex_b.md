# Preval test case

# nested_complex_b.md

> Normalize > Expressions > Nested complex b
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = [], c = 30;
$(a = $(b).length = c);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = []), (c = 30);
$((a = $(b).length = c));
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = [];
c = 30;
const tmpCallCallee = $;
const tmpNestedAssignObj = $(b);
const tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = [];
const tmpNestedAssignObj = $(b);
tmpNestedAssignObj.length = 30;
$(30);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
b.length = 30;
$( 30 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
