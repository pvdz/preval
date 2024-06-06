# Preval test case

# nested_simple_member_left.md

> Normalize > Expressions > Nested simple member left
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = {}), (b = 20), (c = 30);
$(($(a).x = b = c));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = {};
b = 20;
c = 30;
const tmpCallCallee = $;
const varInitAssignLhsComputedObj = $(a);
b = c;
let varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = {};
const varInitAssignLhsComputedObj = $(a);
varInitAssignLhsComputedObj.x = 30;
$(30);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( a );
b.x = 30;
$( 30 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
